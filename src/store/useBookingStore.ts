import { create } from "zustand";
import { format } from "date-fns";
import { API_BASE_URL } from "@/src/lib/data";
import { BookingState } from "@/src/lib/reservationData";
import { toast } from "sonner";

export const useBookingStore = create<BookingState>((set, get) => ({
  step: 0,
  selectedDate: undefined,
  selectedCourt: undefined,
  selectedTimeSlot: undefined,
  courts: [],
  timeSlots: [],
  isLoadingCourts: false,
  isLoadingSlots: false,
  isProcessingPayment: false,
  isPaymentSuccess: false,

  setStep: (step) => set({ step }),

  nextStep: () => set((state) => ({ step: Math.min(3, state.step + 1) })),

  prevStep: () => set((state) => ({ step: Math.max(0, state.step - 1) })),

  selectDate: (date) => {
    set({
      selectedDate: date,
      selectedCourt: undefined,
      selectedTimeSlot: undefined,
    });
  },

  selectCourt: (court) => {
    set({ selectedCourt: court, selectedTimeSlot: undefined });
    get().fetchSlots();
  },

  selectTimeSlot: (slot) => set({ selectedTimeSlot: slot }),

  setProcessingPayment: (status) => set({ isProcessingPayment: status }),

  setPaymentSuccess: (status) => set({ isPaymentSuccess: status }),

  fetchCourts: async () => {
    set({ isLoadingCourts: true });
    try {
      const res = await fetch(`${API_BASE_URL}/api/court`);
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      set({ courts: json.data });
    } catch (error) {
      console.error(error);
      set({ courts: [] });
    } finally {
      set({ isLoadingCourts: false });
    }
  },

  fetchSlots: async () => {
    const { selectedDate, selectedCourt } = get();

    if (!selectedDate || !selectedCourt) {
      set({ timeSlots: [] });
      return;
    }

    set({ isLoadingSlots: true });
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const res = await fetch(
        `${API_BASE_URL}/api/availability?courtId=${selectedCourt.id}&date=${dateStr}`,
      );
      const json = await res.json();

      if (res.ok) {
        set({ timeSlots: json.data });
      } else {
        set({ timeSlots: [] });
      }
    } catch (error) {
      console.error(error);
      set({ timeSlots: [] });
    } finally {
      set({ isLoadingSlots: false });
    }
  },

  resetFlow: () =>
    set({
      step: 0,
      selectedDate: undefined,
      selectedCourt: undefined,
      selectedTimeSlot: undefined,
      timeSlots: [],
      isPaymentSuccess: false,
    }),

  submitBooking: async (customerName, amount, customerEmail) => {
    const { selectedCourt, selectedDate, selectedTimeSlot } = get();

    if (!selectedCourt?.id || !selectedDate || !selectedTimeSlot) {
      toast.error("Data reservasi tidak lengkap.");
      return;
    }

    set({ isProcessingPayment: true });

    const payload = {
      courtId: selectedCourt.id,
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: selectedTimeSlot.time,
      customerName: customerName,
      customerEmail: customerEmail,
      amount: amount,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan");

      const backupData = {
        date: selectedDate,
        court: selectedCourt,
        slot: selectedTimeSlot,
        amount: amount,
        customerName: customerName,
        customerEmail: customerEmail,
      };

      localStorage.setItem("latestBooking", JSON.stringify(backupData));
      console.log("✅ Data backup BERHASIL disimpan ke LocalStorage");

      if (data.redirectPaymentUrl) {
        window.location.href = data.redirectPaymentUrl;
      } else {
        set({ isPaymentSuccess: true });
        toast.success("Booking berhasil!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      set({ isProcessingPayment: false });
    }
  },

  resetBooking: () =>
    set({
      selectedDate: undefined,
      selectedCourt: undefined,
      selectedTime: undefined,
    }),
}));
