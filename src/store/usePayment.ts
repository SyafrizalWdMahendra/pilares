import { create } from "zustand";
import { PaymentState } from "../lib/reservationData";

export const usePaymentStore = create<PaymentState>((set) => ({
  resetBooking: () =>
    set({
      selectedDate: undefined,
      selectedCourt: undefined,
      selectedTime: undefined,
    }),
}));
