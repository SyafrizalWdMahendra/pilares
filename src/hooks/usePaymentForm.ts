import { PaymentFormValues } from "../lib/reservationData";
import { useBookingStore } from "../store/useBookingStore";

export const usePaymentForm = () => {
  const { selectedCourt, submitBooking } = useBookingStore();

  const onSubmit = async (data: PaymentFormValues) => {
    if (!selectedCourt) return;
    await submitBooking(
      data.customerName,
      selectedCourt.amount,
      data.customerEmail,
    );
  };

  return onSubmit;
};
