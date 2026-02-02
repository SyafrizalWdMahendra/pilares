"use client";

import { useEffect } from "react";
import { useBookingStore } from "@/src/store/useBookingStore";
import { Calendar } from "@/src/components/ui/calendar";
import { Separator } from "@/src/components/ui/separator";
import Stepper from "./Stepper";
import NavButton from "./NavButton";
import Header from "./Header";
import TimeSlotSelection from "./TimeSlotSelection";
import CourtSlotSelection from "./CourtSlotSelection";
import { PaymentForm } from "./PaymentForm";
import { Loader2 } from "lucide-react";
import SuccessView from "./SuccessView";

export default function Content() {
  const {
    step,
    selectedDate,
    selectedCourt,
    selectedTimeSlot,
    isLoadingCourts,
    isLoadingSlots,
    isPaymentSuccess,
    selectDate,
    fetchCourts,
  } = useBookingStore();

  useEffect(() => {
    fetchCourts();
  }, [fetchCourts]);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-12 py-6 rounded-3xl bg-white shadow-none sm:shadow-lg gap-6 mt-5 md:mt-5 transition-all duration-300">
      {!isPaymentSuccess && <Stepper activeStep={step + 1} />}

      {!isPaymentSuccess && <Header />}

      {step === 0 && (
        <div className="animate-fade-in">
          <div className="h-80 overflow-auto animate-in fade-in zoom-in-95 duration-300 fill-mode-backwards">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && selectDate(date)}
              className="m-auto rounded-lg border shadow-sm"
              fromDate={new Date()}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in">
          {isLoadingCourts ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <CourtSlotSelection />
          )}
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          {isLoadingSlots ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <p className="text-sm text-muted-foreground">
                Checking availability...
              </p>
            </div>
          ) : (
            <TimeSlotSelection />
          )}
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          {isPaymentSuccess ? (
            <SuccessView />
          ) : (
            selectedDate && selectedTimeSlot && selectedCourt && <PaymentForm />
          )}
        </div>
      )}

      {!isPaymentSuccess && (
        <>
          <Separator />
          <NavButton />
        </>
      )}
    </div>
  );
}
