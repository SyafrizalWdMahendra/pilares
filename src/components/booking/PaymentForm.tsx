"use client";

import { useState } from "react";
import { Lock, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { BOOKING_PRICE, Court, TimeSlot } from "@/src/lib/reservationData";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";

interface PaymentFormProps {
  selectedDate: Date;
  selectedTimeSlot: TimeSlot;
  selectedCourt: Court;
  onPaymentComplete: (name: string, date: Date, time: string) => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

export const PaymentForm = ({
  selectedDate,
  selectedTimeSlot,
  selectedCourt,
  onPaymentComplete,
  isProcessing,
}: PaymentFormProps) => {
  const [customerName, setCustomerName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return alert("Nama wajib diisi!");

    onPaymentComplete(customerName, selectedDate, selectedTimeSlot.time);
  };

  const isFormValid = customerName.length >= 2;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300 fill-mode-backwards h-80 overflow-auto">
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 bg-[#e6edf4] rounded-2xl p-5 h-fit animate-slide-up">
          <h3 className="font-display text-md font-semibold mb-4 text-[#3f6489]">
            Booking Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center">
                🕐
              </span>
              <span>{selectedTimeSlot.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center">
                <Image
                  src={selectedCourt.image}
                  alt={selectedCourt.name}
                  width={100}
                  height={100}
                  className={cn(
                    "w-4 h-4 rounded-xl object-cover transition-colors",
                    selectedCourt?.id === selectedCourt.id
                      ? "bg-card"
                      : "bg-secondary group-hover:bg-[#e6edf4]",
                  )}
                />
              </span>
              <span>{selectedCourt.name}</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="md:col-span-3 bg-card rounded-2xl shadow-lg p-6 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Secure 256-bit SSL encryption</span>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Cardholder Name
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  className="border p-2 rounded w-full pl-10"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isProcessing}
              className={cn(
                "w-full h-12 mt-4 font-semibold text-base transition-all duration-300",
                isFormValid
                  ? "bg-[#3f6489] cursor-pointer"
                  : "bg-[#e6edfa] text-muted-foreground",
              )}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                `Pay $${BOOKING_PRICE}`
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            By completing this purchase you agree to our Terms of Service
          </p>
        </form>
      </div>
    </div>
  );
};
