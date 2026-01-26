import { Court } from "@/src/lib/reservationData";
import { cn } from "@/src/lib/utils";
import { Check, Users } from "lucide-react";
import Image from "next/image";

interface CourtSelectionProps {
  selectedCourt: Court | undefined;
  onSelectCourt: (court: Court) => void;
  courtSlots: Court[];
}

export default function CourtSlotSelection({
  selectedCourt,
  onSelectCourt,
  courtSlots,
}: CourtSelectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300 fill-mode-backwards h-80 overflow-auto">
      {courtSlots.map((court, index) => {
        const isSelected = selectedCourt?.id === court.id;

        return (
          <button
            type="button"
            key={court.id}
            onClick={() => {
              console.log("Court Dipilih:", court); 
              onSelectCourt(court);
            }}
            className={cn(
              "group relative p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer",
              selectedCourt?.id === court.id
                ? "border-[#3f6489] bg-[#e6edf4]"
                : "border-border bg-card hover:border-[#e6edf4] hover:shadow-md hover:shadow-[#e6edf4] hover:-translate-y-0.5 ",
            )}
          >
            <div className="flex items-start gap-4">
              {/* Image */}
              <Image
                src={court.image}
                alt={court.name}
                width={56}
                height={56}
                className={cn(
                  "w-14 h-14 rounded-xl object-cover transition-colors",
                  isSelected
                    ? "bg-card"
                    : "bg-secondary group-hover:bg-[#e6edf4]",
                )}
              />

              {/* Content */}
              <div className="flex-1">
                <h3
                  className={cn(
                    "font-display text-xl font-semibold mb-1 transition-colors",
                    isSelected ? "text-[#3f6489]" : "text-foreground",
                  )}
                >
                  {court.name}
                </h3>

                {court.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {court.description}
                  </p>
                )}

                {typeof court.capacity === "number" && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>Capacity: {court.capacity} people</span>
                  </div>
                )}
              </div>

              {/* Check Icon */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#3f6489] flex items-center justify-center animate-scale-in">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
