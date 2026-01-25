"use client";

import { useState } from "react";
import { CreditCard, Lock, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { BOOKING_PRICE, Court, TimeSlot } from "@/src/lib/reservationData";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface PaymentFormProps {
  selectedDate: Date;
  selectedTimeSlot: TimeSlot;
  selectedCourt: Court;
  onPaymentComplete: () => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

export const PaymentForm = ({
  selectedDate,
  selectedTimeSlot,
  selectedCourt,
  onPaymentComplete,
  isProcessing,
  setIsProcessing,
}: PaymentFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) return v.substring(0, 2) + "/" + v.substring(2, 4);
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onPaymentComplete();
    setIsProcessing(false);
  };

  const isFormValid =
    cardNumber.replace(/\s/g, "").length === 16 &&
    expiry.length === 5 &&
    cvv.length >= 3 &&
    name.length >= 2;

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Booking Summary */}
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
                {selectedCourt.image}
              </span>
              <span>{selectedCourt.name}</span>
            </div>
          </div>
          <div className="border-t border-[#3f6489] mt-6 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#3f6489]">Total</span>
              <span className="font-display text-lg font-bold text-[#3f6489]">
                ${BOOKING_PRICE}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
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
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="card" className="text-sm font-medium">
                Card Number
              </Label>
              <div className="relative mt-1">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="card"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry" className="text-sm font-medium">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-sm font-medium">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  placeholder="123"
                  maxLength={4}
                  type="password"
                  className="mt-1"
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
