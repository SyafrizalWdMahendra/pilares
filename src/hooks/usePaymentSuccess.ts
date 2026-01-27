"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/src/store/useBookingStore";
import { DisplayData } from "../lib/reservationData";

export function usePaymentSuccess() {
  const router = useRouter();
  const { selectedDate, selectedTimeSlot, selectedCourt, resetFlow } =
    useBookingStore();

  const [displayData, setDisplayData] = useState<DisplayData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("latestBooking");
    if (saved) {
      const parsed = JSON.parse(saved);
      setDisplayData({
        ...parsed,
        date: new Date(parsed.date),
      });
      setIsLoading(false);
      return;
    }

    if (selectedDate && selectedTimeSlot && selectedCourt) {
      setDisplayData({
        date: selectedDate,
        slot: selectedTimeSlot,
        court: selectedCourt,
        customerName: "Guest",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, [selectedDate, selectedTimeSlot, selectedCourt]);

  const handleBookNew = () => {
    localStorage.removeItem("latestBooking");
    resetFlow();
    router.push("/");
  };

  return {
    isLoading,
    displayData,
    handleBookNew,
  };
}
