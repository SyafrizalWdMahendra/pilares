"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useBookingStore } from "@/src/store/useBookingStore";

export default function NavButton() {
  const {
    step,
    prevStep,
    nextStep,
    selectedDate,
    selectedCourt,
    selectedTimeSlot,
  } = useBookingStore();

  const isNextDisabled =
    (step === 0 && !selectedDate) ||
    (step === 1 && !selectedCourt) ||
    (step === 2 && !selectedTimeSlot);

  const showBackButton = step > 0;
  const showNextButton = step < 3;

  return (
    <div className="flex m-auto w-full justify-between">
      <div className="w-25">
        {showBackButton && (
          <button
            onClick={prevStep}
            className="group flex items-center justify-center gap-2 px-5 py-2 rounded-lg hover:bg-[#e6edf4] text-gray-600 hover:text-[#3f6489] transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
        )}
      </div>

      <div className="w-25 flex justify-end">
        {showNextButton && (
          <button
            onClick={nextStep}
            disabled={isNextDisabled}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 ${
              isNextDisabled
                ? "bg-[#e6edf4] text-gray-400 cursor-not-allowed"
                : "group flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-[#3f6489] text-white shadow-md transition-all duration-200 cursor-pointer"
            }`}
          >
            <span>Next</span>
            <ArrowRight
              className={`w-4.5 h-4.5 transition-transform ${
                !isNextDisabled &&
                "w-4.5 h-4.5 transition-transform group-hover:translate-x-1 "
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
