"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User, Mail, MapPlus, Clock, Calendar } from "lucide-react";
import { cn, rupiahFormat } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { useBookingStore } from "@/src/store/useBookingStore";
import { PaymentFormValues, paymentSchema } from "@/src/lib/reservationData";
import { usePaymentForm } from "@/src/hooks/usePaymentForm";
import { FormInput } from "../ui/form-input";
import Image from "next/image";

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
          <div className="space-y-3 text-sm text-[#3f6489]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{selectedDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{selectedTimeSlot.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={selectedCourt.image}
                alt={selectedCourt.name}
                width={80}
                height={80}
                className="rounded-lg object-cover w-4 h-4"
              />
              <span>{selectedCourt.name}</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#3f6489] text-[#3f6489]">
              <span className="font-medium">Total</span>
              <span className="font-bold ">
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
            <FormInput
              label="Customer Name"
              name="customerName"
              placeholder="Enter your full name"
              icon={User}
              register={register}
              error={errors.customerName}
            />

            <FormInput
              label="Email Address"
              name="customerEmail"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              register={register}
              error={errors.customerEmail}
            />

            <Button
              type="submit"
              disabled={!isValid || isProcessingPayment}
              className={cn(
                "w-full h-12 mt-4 font-semibold text-base transition-all",
                isValid
                  ? "bg-[#3f6489] cursor-pointer"
                  : "bg-[#e6edfa] text-muted-foreground",
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
