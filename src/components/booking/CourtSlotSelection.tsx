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
    <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {courtSlots.map((court, index) => (
        <button
          key={court.id}
          onClick={() => court.available && onSelectCourt(court)}
          disabled={!court.available}
          className={cn(
            "group relative p-6 rounded-2xl border-2 text-left transition-all duration-300",
            "animate-slide-up",
            court.available
              ? selectedCourt?.id === court.id
                ? "border-[#3f6489] bg-[#e6edf4]"
                : "border-border bg-card hover:border-[#e6edf4] hover:shadow-lg hover:shadow-[#e6edf4] cursor-pointer"
              : "border-border bg-muted/50 cursor-not-allowed opacity-60",
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start gap-4">
            <Image
              src={court.image}
              alt={court.name}
              width={100}
              height={100}
              className={cn(
                "w-14 h-14 rounded-xl object-cover transition-colors",
                selectedCourt?.id === court.id
                  ? "bg-card"
                  : "bg-secondary group-hover:bg-[#e6edf4]",
              )}
            />

            <div className="flex-1">
              <h3
                className={cn(
                  "font-display text-xl font-semibold mb-1 transition-colors",
                  selectedCourt?.id === court.id
                    ? "text-[#3f6489]"
                    : "text-foreground",
                )}
              >
                {court.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {court.description}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                <span>Capacity: {court.capacity} people</span>
              </div>
            </div>

            {selectedCourt?.id === court.id && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#3f6489] flex items-center justify-center animate-scale-in">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>

          {!court.available && (
            <div className="absolute inset-0 rounded-2xl bg-background/50 flex items-center justify-center">
              <span className="bg-muted px-3 py-1 rounded-full text-sm font-medium text-muted-foreground">
                Unavailable
              </span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
