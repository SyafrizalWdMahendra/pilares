import { cn } from "@/src/lib/utils";
import { Check, Users, MapPin } from "lucide-react";
import Image from "next/image";
import { useBookingStore } from "@/src/store/useBookingStore";

export default function CourtSlotSelection() {
  const { courts, selectedCourt, selectCourt } = useBookingStore();

  if (!courts || courts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed rounded-2xl border-gray-200">
        <p className="text-muted-foreground">
          No courts available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300 fill-mode-backwards h-80 overflow-auto pr-2">
      {courts.map((court, index) => {
        const isSelected = selectedCourt?.id === court.id;

        return (
          <button
            type="button"
            key={court.id}
            onClick={() => selectCourt(court)}
            className={cn(
              "group relative p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer w-full",
              isSelected
                ? "border-[#3f6489] bg-[#e6edf4] shadow-sm"
                : "border-border bg-card hover:border-[#e6edf4] hover:shadow-md hover:shadow-[#e6edf4] hover:-translate-y-0.5",
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "relative w-14 h-14 rounded-xl overflow-hidden shrink-0 transition-colors",
                  isSelected ? "bg-white" : "bg-gray-100",
                )}
              >
                {court.image ? (
                  <Image
                    src={court.image}
                    alt={court.name}
                    fill
                    className="object-cover"
                    sizes="sm"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    "font-display text-xl font-semibold mb-1 transition-colors truncate",
                    isSelected ? "text-[#3f6489]" : "text-foreground",
                  )}
                >
                  {court.name}
                </h3>

                {court.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {court.description}
                  </p>
                )}

                {court.capacity && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>Capacity: {court.capacity} people</span>
                  </div>
                )}
              </div>

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
