"use client";

import { useBookingStore } from "@/src/store/useBookingStore";
import { format } from "date-fns";

export default function Header() {
  const { step, selectedDate, selectedCourt, isPaymentSuccess } =
    useBookingStore();

  let title = "";
  let subtitle = "";

  switch (step) {
    case 0:
      title = "Select Your Date";
      subtitle = "Choose the perfect day for your Pilates session";
      break;

    case 1:
      title = "Select Your Studio";
      if (selectedDate) {
        subtitle = `Available studios for ${format(selectedDate, "EEEE, MMMM d")}`;
      } else {
        subtitle = "Please select a date first";
      }
      break;

    case 2:
      title = "Choose Your Time";
      if (selectedDate && selectedCourt) {
        subtitle = `Available slots at ${selectedCourt.name}`;
      } else {
        subtitle = "Please select court first";
      }
      break;

    case 3:
      if (isPaymentSuccess) {
        title = "Payment Completed";
        subtitle = "Let's book another service";
      } else {
        title = "Complete Payment";
        subtitle = "Secure checkout for your Pilates session";
      }
      break;

    default:
      title = "Booking";
      subtitle = "Make a reservation";
  }

  return (
    <div className="text-center px-2 mb-3 animate-fade-in">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
