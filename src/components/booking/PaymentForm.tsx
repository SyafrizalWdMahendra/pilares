"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User, Mail } from "lucide-react";
import { cn, rupiahFormat } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useBookingStore } from "@/src/store/useBookingStore";
import { PaymentFormValues, paymentSchema } from "@/src/lib/reservationData";
import { usePaymentForm } from "@/src/hooks/usePaymentForm";

export const PaymentForm = () => {
  const { selectedDate, selectedTimeSlot, selectedCourt, isProcessingPayment } =
    useBookingStore();
  const onSubmit = usePaymentForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
  });

  if (!selectedDate || !selectedTimeSlot || !selectedCourt) {
    return (
      <div className="text-center p-10 text-muted-foreground bg-gray-50 rounded-xl border border-dashed">
        <p>Data reservasi tidak lengkap.</p>
        <p className="text-sm">Silakan kembali ke langkah awal.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 bg-[#e6edf4] rounded-2xl p-5 h-fit">
          <h3 className="font-display text-md font-semibold mb-4 text-[#3f6489]">
            Booking Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span>{selectedCourt.name}</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#3f6489]">
              <span className="font-medium">Total</span>
              <span className="font-bold">
                {rupiahFormat(selectedCourt.amount)}
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-3 bg-card border rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Secure 256-bit SSL encryption</span>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName" className="text-sm font-medium">
                Customer Name
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...register("customerName")}
                  className={cn(
                    "pl-10",
                    errors.customerName &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.customerName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.customerName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="customerEmail" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...register("customerEmail")}
                  type="email"
                  className={cn(
                    "pl-10",
                    errors.customerEmail && "border-red-500",
                  )}
                  placeholder="name@example.com"
                />
              </div>
              {errors.customerEmail && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.customerEmail.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isValid || isProcessingPayment}
              className={cn(
                "w-full h-12 mt-4 font-semibold text-base transition-all",
                isValid ? "bg-[#3f6489] cursor-pointer" : "bg-[#e6edfa] text-muted-foreground",
              )}
            >
              {isProcessingPayment ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
