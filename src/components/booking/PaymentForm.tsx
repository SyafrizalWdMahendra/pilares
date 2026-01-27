"use client";

import { useState } from "react";
import { Lock, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { cn, rupiahFormat } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import { useBookingStore } from "@/src/store/useBookingStore";

export const PaymentForm = () => {
  const {
    selectedDate,
    selectedTimeSlot,
    selectedCourt,
    isProcessingPayment,
    submitBooking,
  } = useBookingStore();

  const [customerName, setCustomerName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName) return;
    if (!selectedCourt) return;

    await submitBooking(customerName, selectedCourt.amount);
  };

  if (!selectedDate || !selectedTimeSlot || !selectedCourt) {
    return (
      <div className="text-center p-10 text-muted-foreground bg-gray-50 rounded-xl border border-dashed">
        <p>Data reservasi tidak lengkap.</p>
        <p className="text-sm">Silakan kembali ke langkah awal.</p>
      </div>
    );
  }

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
          <div className="border-t border-[#3f6489] mt-6 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#3f6489]">Total</span>
              <span className="font-display text-lg font-bold text-[#3f6489]">
                {rupiahFormat(selectedCourt.amount)}
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="md:col-span-3 bg-card border rounded-2xl p-6 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Secure 256-bit SSL encryption</span>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Customer Name
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  className="border p-2 rounded w-full pl-10"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isProcessingPayment}
              className={cn(
                "w-full h-12 mt-4 font-semibold text-base transition-all duration-300",
                isFormValid
                  ? "bg-[#3f6489] cursor-pointer"
                  : "bg-[#e6edfa] text-muted-foreground",
              )}
            >
              {isProcessingPayment ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Pay"
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
