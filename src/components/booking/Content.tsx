"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { API_BASE_URL } from "@/src/lib/data";
import { Court, TimeSlot } from "@/src/lib/reservationData";

// Components
import { Calendar } from "@/src/components/ui/calendar";
import { Separator } from "@/src/components/ui/separator";
import Stepper from "./Stepper";
import NavButton from "./NavButton";
import Header from "./Header";
import TimeSlotSelection from "./TimeSlotSelection";
import CourtSlotSelection from "./CourtSlotSelection";
import { PaymentForm } from "./PaymentForm";
import { Loader2 } from "lucide-react"; // Ikon loading

interface ContentProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  selectedTimeSlot?: TimeSlot;
  onSelectTimeSlot: (slot: TimeSlot) => void;
  selectedCourt?: Court;
  onSelectCourt: (court: Court) => void;
  onPaymentComplete: (name: string, date: Date, time: string) => void;
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
  const [courts, setCourts] = useState<Court[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingCourts, setLoadingCourts] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/court`);
        if (!res.ok) throw new Error("Failed to fetch courts");
        const json = await res.json();
        setCourts(json.data);
      } catch (error) {
        console.error("Error fetching courts:", error);
      } finally {
        setLoadingCourts(false);
      }
    };

    fetchCourts();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate || !selectedCourt) {
        setTimeSlots([]);
        return;
      }

      setLoadingSlots(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const res = await fetch(
          `${API_BASE_URL}/api/availability?courtId=${selectedCourt.id}&date=${dateStr}`,
        );
        const json = await res.json();

        if (res.ok) {
          setTimeSlots(json.data);
        } else {
          console.error("Failed to fetch slots:", json.error);
          setTimeSlots([]);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        setTimeSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedDate, selectedCourt]);

  useEffect(() => {
    if (isPaymentSuccess) {
      setStep(0);
    }
  }, [isPaymentSuccess]);

  const handleNext = () => {
    setStep((s) => Math.min(3, s + 1));
  };

  const handlePrev = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-12 py-6 rounded-3xl lg:rounded-3xl md:rounded-3xl bg-white shadow-none sm:shadow-lg gap-6 mt-5 md:mt-5">
      <Stepper activeStep={step + 1} />

      {step === 0 && (
        <div className="animate-fade-in">
          <Header
            title="Select Your Date"
            subtitle="Choose the perfect day for your Pilates session"
          />
          <div className="h-80 overflow-auto">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onSelectDate(date)}
              className="m-auto rounded-lg border shadow-sm"
              fromDate={new Date()}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in">
          <Header
            title="Select Your Studio"
            subtitle={
              selectedDate
                ? `Available studios for ${format(selectedDate, "EEEE, MMMM d")}`
                : "Please select a date first"
            }
          />
          {loadingCourts ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <CourtSlotSelection
              courtSlots={courts}
              selectedCourt={selectedCourt}
              onSelectCourt={onSelectCourt}
            />
          )}
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <Header
            title="Choose Your Time"
            subtitle={
              selectedDate && selectedCourt
                ? `Available slots at ${selectedCourt.name}`
                : "Please select court first"
            }
          />

          {loadingSlots ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <p className="text-sm text-muted-foreground">
                Checking availability...
              </p>
            </div>
          ) : (
            <TimeSlotSelection
              selectedTimeSlot={selectedTimeSlot}
              onSelectTimeSlot={onSelectTimeSlot}
              timeSlots={timeSlots}
            />
          )}
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
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

          {selectedDate && selectedTimeSlot && selectedCourt && (
            <PaymentForm
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              selectedCourt={selectedCourt}
              onPaymentComplete={onPaymentComplete}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
          )}
        </div>
      )}

      <Separator />

      <NavButton
        step={step}
        isPrevDisabled={step === 0}
        isNextDisabled={
          step === 0
            ? !selectedDate
            : step === 1
              ? !selectedCourt
              : step === 2
                ? !selectedTimeSlot
                : false
        }
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
