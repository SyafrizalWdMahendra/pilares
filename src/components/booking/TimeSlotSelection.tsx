import { cn } from "@/src/lib/utils";
import { useBookingStore } from "@/src/store/useBookingStore";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export default function TimeSlotSelection() {
  const { timeSlots, selectedTimeSlot, selectTimeSlot } = useBookingStore();

  if (!timeSlots || timeSlots.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No slots available for this date.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mx-auto w-full pr-2 h-80 overflow-auto">
      {timeSlots.map((slot, index) => {
        const isAvailable = slot.isAvailable;
        const isSelected = selectedTimeSlot?.time === slot.time;

        return (
          <button
            key={slot.time}
            type="button"
            onClick={() => isAvailable && selectTimeSlot(slot)}
            disabled={!isAvailable}
            className={cn(
              "relative group flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 w-full h-full aspect-4/3",
              "animate-in fade-in zoom-in-95 duration-300 fill-mode-backwards",
              isAvailable
                ? isSelected
                  ? "border-[#3f6489] bg-[#e6edf4] shadow-md cursor-pointer"
                  : "border-gray-200 bg-white hover:border-[#3f6489]/50 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
                : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed grayscale",
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col items-center gap-2 z-10">
              <Clock
                className={cn(
                  "w-5 h-5 mb-1",
                  isSelected
                    ? "text-[#3f6489]"
                    : "text-gray-400 group-hover:text-[#3f6489]",
                )}
              />

              <span
                className={cn(
                  "font-semibold text-sm text-center leading-tight",
                  isSelected ? "text-[#3f6489]" : "text-gray-700",
                )}
              >
                {slot.time}
              </span>

              <div className="flex items-center gap-1.5 mt-1">
                {isAvailable ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    <span className="text-[10px] font-medium text-green-700 uppercase tracking-wide">
                      Available
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 text-red-400" />
                    <span className="text-[10px] font-medium text-red-400 uppercase tracking-wide">
                      Booked
                    </span>
                  </>
                )}
              </div>
            </div>

            {isSelected && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#3f6489] animate-ping" />
            )}
          </button>
        );
      })}
    </div>
  );
}
