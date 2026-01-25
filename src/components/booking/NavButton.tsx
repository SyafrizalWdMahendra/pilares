"use client";

import { ArrowLeft, ArrowRight, ArrowRightCircle } from "lucide-react";

interface NavButtonProps {
  isPrevDisabled?: boolean; // hide/disable only
  isNextDisabled?: boolean; // disable only
  onPrev: () => void;
  onNext: () => void;
  step: number; // pass current step to hide Next on step 3
}

export default function NavButton({
  isPrevDisabled = false,
  isNextDisabled = false,
  onPrev,
  onNext,
  step,
}: NavButtonProps) {
  return (
    <div className="flex m-auto w-full justify-between">
      {!isPrevDisabled && (
        <button
          onClick={onPrev}
          className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg hover:bg-[#e6edf4] cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          <span>Back</span>
        </button>
      )}

      {step !== 3 && (
        <>
          <button
            onClick={onNext}
            disabled={isNextDisabled}
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg ml-auto ${
              isNextDisabled
                ? "bg-[#e6edf4] text-gray-400 cursor-not-allowed"
                : "bg-[#3f6489] text-white cursor-pointer"
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </>
      )}
    </div>
  );
}
