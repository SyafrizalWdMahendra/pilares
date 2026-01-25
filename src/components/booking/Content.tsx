"use client";

import { useState } from "react";
import { Calendar } from "@/src/components/ui/calendar";
import Stepper from "./Stepper";
import { Separator } from "@/src/components/ui/separator";
import NavButton from "./NavButton";
import Header from "./Header";
import {
  Court,
  getCourtsForSlot,
  getTimeSlotsForDate,
  TimeSlot,
} from "@/src/lib/reservationData";
import TimeSlotSelection from "./TimeSlotSelection";
import CourtSlotSelection from "./CourtSlotSelection";
import { PaymentForm } from "./PaymentForm";
import { format } from "date-fns";
import { Check } from "lucide-react";

interface ContentProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  selectedTimeSlot?: TimeSlot;
  onSelectTimeSlot: (slot: TimeSlot) => void;
  selectedCourt?: Court;
  onSelectCourt: (court: Court) => void;
  onPaymentComplete: () => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  isPaymentSuccess: boolean;
}

export default function Content({
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  selectedCourt,
  onSelectCourt,
  onPaymentComplete,
  isProcessing,
  setIsProcessing,
  isPaymentSuccess,
}: ContentProps) {
  const [step, setStep] = useState(0);

  const timeSlots: TimeSlot[] = selectedDate
    ? getTimeSlotsForDate(selectedDate)
    : [];

  const courtSlots: Court[] =
    selectedDate && selectedTimeSlot
      ? getCourtsForSlot(selectedDate, selectedTimeSlot.id)
      : [];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-12 py-6 rounded-3xl lg:rounded-3xl md:rounded-3xl bg-white shadow-none sm:shadow-lg gap-6 mt-5 md:mt-5">
      {/* ===== STEPPER ===== */}
      <Stepper activeStep={step + 1} />

      {/* ===== STEP 0: DATE ===== */}
      {step === 0 && (
        <>
          <Header
            title="Select Your Date"
            subtitle="Choose the perfect day for your Pilates session"
          />
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onSelectDate(date)}
            className="m-auto rounded-lg border"
          />
        </>
      )}

      {/* ===== STEP 1: TIME ===== */}
      {step === 1 && (
        <>
          <Header
            title="Choose Your Time"
            subtitle={
              selectedDate
                ? `Available sessions for ${format(selectedDate, "EEEE, MMMM d")}`
                : "Please select a date first"
            }
          />

          <TimeSlotSelection
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={onSelectTimeSlot}
            timeSlots={timeSlots}
          />
        </>
      )}

      {/* ===== STEP 2: STUDIO ===== */}
      {step === 2 && (
        <>
          <Header
            title="Select Your Studio"
            subtitle={
              selectedDate && selectedTimeSlot
                ? `${format(selectedDate, "EEEE, MMMM d")} at ${selectedTimeSlot.time}`
                : "Please select date and time first"
            }
          />
          <CourtSlotSelection
            selectedCourt={selectedCourt}
            onSelectCourt={onSelectCourt}
            courtSlots={courtSlots}
          />
        </>
      )}

      {/* ===== STEP 3: PAYMENT ===== */}
      {step === 3 && (
        <>
          {isPaymentSuccess ? (
            <Header
              title="Payment Completed"
              subtitle="Let's book another services"
            />
          ) : (
            <Header
              title="Complete Payment"
              subtitle="Secure checkout for your Pilates session"
            />
          )}

          {selectedDate && selectedTimeSlot && selectedCourt ? (
            <PaymentForm
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              selectedCourt={selectedCourt}
              onPaymentComplete={onPaymentComplete}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
          ) : null}
        </>
      )}

      <Separator />

      <NavButton
        step={step}
        isPrevDisabled={step === 0}
        isNextDisabled={
          step === 0
            ? !selectedDate
            : step === 1
              ? !selectedTimeSlot
              : step === 2
                ? !selectedCourt
                : false
        }
        onPrev={() => setStep((s) => Math.max(0, s - 1))}
        onNext={() => setStep((s) => Math.min(3, s + 1))}
      />
    </div>
  );
}
