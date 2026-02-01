import z from "zod";

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

export interface Court {
  id: number;
  name: string;
  description: string;
  capacity: number;
  available: boolean;
  image: string;
  amount: number;
}

export interface Reservation {
  date: Date;
  timeSlot: TimeSlot;
  court: Court;
}

export const BOOKING_PRICE = 35;

export interface StepperProps {
  activeStep: number;
}

export interface BookingState {
  step: number;
  selectedDate: Date | undefined;
  selectedCourt: Court | undefined;
  selectedTimeSlot: TimeSlot | undefined;
  courts: Court[];
  timeSlots: TimeSlot[];
  isLoadingCourts: boolean;
  isLoadingSlots: boolean;
  isProcessingPayment: boolean;
  isPaymentSuccess: boolean;
  selectedTime?: string;
  resetBooking: () => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  selectDate: (date: Date) => void;
  selectCourt: (court: Court) => void;
  selectTimeSlot: (slot: TimeSlot) => void;
  setProcessingPayment: (status: boolean) => void;
  setPaymentSuccess: (status: boolean) => void;
  submitBooking: (
    customerName: string,
    amount: number,
    customerEmail: string,
  ) => Promise<void>;
  fetchCourts: () => Promise<void>;
  fetchSlots: () => Promise<void>;
  resetFlow: () => void;
}

export interface PaymentState {
  selectedDate?: Date;
  selectedCourt?: Court;
  selectedTime?: string;
  resetBooking: () => void;
}

export interface InfoRowProps {
  icon: any;
  label: string;
  value: string;
}

export interface DisplayData {
  date: Date;
  slot: any;
  court: any;
  customerName?: string;
  customerEmail?: string;
}

export interface BookingParams {
  courtId: number;
  date: string;
  startTime: string;
  customerName: string;
  customerEmail: string;
  amount: number;
}

export const paymentSchema = z.object({
  customerName: z.string().min(3, "Nama minimal 3 karakter"),
  customerEmail: z.string().email("Format email tidak valid"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
