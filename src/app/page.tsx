"use client";

import { useEffect, useState } from "react";
import { Court, TimeSlot } from "../lib/reservationData";
import Content from "../components/booking/Content";
import Footer from "../components/booking/Footer";
import Navbar from "../components/booking/Navbar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../lib/data";
import { format } from "date-fns";

export default function Home() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<
    TimeSlot | undefined
  >();
  const [selectedCourt, setSelectedCourt] = useState<Court | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentComplete = async (
    customerName: string,
    dateFromChild: Date,
    timeFromChild: string,
  ) => {
    setIsLoading(true);

    if (!selectedCourt?.id) {
      toast.error("Data lapangan hilang. Silakan pilih lapangan lagi.");
      setIsLoading(false);
      return;
    }

    const payload = {
      courtId: selectedCourt.id,
      date: format(dateFromChild, "yyyy-MM-dd"),
      startTime: timeFromChild,
      customerName: customerName,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setIsPaymentSuccess(true);
      toast.success("Booking berhasil!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isPaymentSuccess) {
      const timer = setTimeout(() => {
        setIsPaymentSuccess(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isPaymentSuccess]);

  return (
    <div className="bg-[#e6edf4] min-h-screen py-10 lg:px-5 md:px-5 px-5 w-full flex flex-col font-sans">
      <Navbar />

      <Content
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedTimeSlot={selectedTimeSlot}
        onSelectTimeSlot={setSelectedTimeSlot}
        selectedCourt={selectedCourt}
        onSelectCourt={setSelectedCourt}
        onPaymentComplete={handlePaymentComplete}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        isPaymentSuccess={isPaymentSuccess}
      />

      <Footer />
    </div>
  );
}
