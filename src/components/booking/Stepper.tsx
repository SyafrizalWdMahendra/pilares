import { StepperProps } from "@/src/lib/reservationData";
import { Check } from "lucide-react";

export default function Stepper({ activeStep }: StepperProps) {
  const steps = ["Date", "Time", "Studio", "Payment"];

  return (
    <div className="w-full">
      <div className="flex sm:justify-center gap-4 sm:gap-2">
        {steps.map((label, index) => {
          const stepNumber = index + 1;

          const isCompleted = stepNumber < activeStep;
          const isActive = stepNumber === activeStep;
          const isLineActive = stepNumber < activeStep;

          return (
            <div
              key={label}
              className="flex sm:items-center items-start sm:gap-2"
            >
              <div className="flex sm:items-center items-start w-10 justify-center">
                <div className="flex sm:flex-col items-center gap-1 w-20 shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ${
                      isCompleted || isActive
                        ? "bg-[#3f6489] text-white"
                        : "bg-[#e6edf4] text-gray-500"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                  </div>

                  <p
                    className={`text-xs text-center transition-colors ${
                      isCompleted || isActive
                        ? "text-[#3f6489] font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              </div>

              {stepNumber !== steps.length && (
                <div
                  className={`
                    sm:h-px sm:w-15 h-px
                    transition-colors duration-300 border
                    ${isLineActive ? " border border-[#3f6489]" : "bg-[#e6edf4]"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
