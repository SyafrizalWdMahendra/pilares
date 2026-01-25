import { TimeSlot } from "@/src/lib/reservationData";
import { cn } from "@/src/lib/utils";
import { Clock, Users } from "lucide-react";

export default function TimeSlotSelection({
  selectedTimeSlot,
  onSelectTimeSlot,
  timeSlots,
}: {
  selectedTimeSlot: TimeSlot | undefined;
  onSelectTimeSlot: (slot: TimeSlot) => void;
  timeSlots: TimeSlot[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 px-4 mx-auto">
      {timeSlots.map((slot, index) => {
        const isSelected = selectedTimeSlot?.id === slot.id;
        return (
          <button
            key={slot.id}
            onClick={() => slot.available && onSelectTimeSlot(slot)}
            disabled={!slot.available}
            className={cn(
              "group relative p-4 rounded-xl border-2 transition-all duration-300",
              "animate-slide-up",
              slot.available
                ? isSelected
                  ? "border-[#3f6489] bg-[#e6edf4]"
                  : "border-2 bg-card hover:border-[#e6edf4] hover:shadow-lg hover:shadow-[#e6edf4] cursor-pointer"
                : "border-border bg-muted/50 cursor-not-allowed opacity-60",
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col items-center gap-2">
              <Clock
                className={cn(
                  "w-5 h-5 transition-colors",
                  isSelected
                    ? "text-[#3f6489]"
                    : "text-muted-foreground group-hover:text-primary",
                )}
              />
              <span
                className={cn(
                  "font-semibold text-md",
                  isSelected ? "text-[#3f6489]" : "text-foreground",
                )}
              >
                {slot.time}
              </span>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs",
                  slot.available
                    ? slot.spotsLeft <= 3
                      ? "text-terracotta"
                      : "text-muted-foreground"
                    : "text-muted-foreground",
                )}
              >
                <Users className="w-3 h-3" />
                {slot.available ? (
                  <span>
                    {slot.spotsLeft} {slot.spotsLeft === 1 ? "spot" : "spots"}{" "}
                    left
                  </span>
                ) : (
                  <span>Fully booked</span>
                )}
              </div>
            </div>

            {isSelected && (
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#3f6489] animate-scale-in" />
            )}
          </button>
        );
      })}
    </div>
  );
}
