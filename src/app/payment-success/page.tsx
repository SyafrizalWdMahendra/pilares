"use client";

import { format } from "date-fns";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Loader2,
  User,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { rupiahFormat } from "@/src/lib/utils";
import InfoRow from "@/src/components/booking/InfoRow";
import { usePaymentSuccess } from "@/src/hooks/usePaymentSuccess";

export default function PaymentSuccess() {
  const { isLoading, displayData, handleBookNew } = usePaymentSuccess();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] animate-fade-in">
        <Loader2 className="w-8 h-8 animate-spin text-[#3f6489]" />
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Pembayaran Berhasil!
        </h1>
        <p className="text-gray-500 mb-6">Terima kasih atas reservasi Anda.</p>
        <Button
          onClick={handleBookNew}
          className="bg-[#3f6489] text-white cursor-pointer"
        >
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  const { date, slot, court, customerName } = displayData;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 text-center max-w-xl mx-auto py-10 px-6 bg-[#e6edf4] h-dvh">
      <div className="mb-8">
        <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-[#3f6489]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#3f6489] mb-3">
          Booking Confirmed!
        </h2>
      </div>

      <div className="bg-card rounded-3xl p-6 mb-8 text-left">
        <div className="space-y-4">
          <InfoRow
            icon={User}
            label="Customer Name"
            value={customerName || "-"}
          />
          <InfoRow
            icon={Calendar}
            label="Date"
            value={format(date, "EEEE, MMMM d, yyyy")}
          />
          <InfoRow icon={Clock} label="Time" value={slot.time} />
          <InfoRow icon={MapPin} label="Studio" value={court.name} />

          <div className="border-t mt-4 pt-4 flex justify-between items-center">
            <span className="text-muted-foreground">Total Paid</span>
            <span className="font-bold text-[#3f6489] text-lg">
              {rupiahFormat(court.amount)}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleBookNew}
        className="w-full h-12 bg-[#3f6489] text-white rounded-xl gap-2 cursor-pointer"
      >
        Book Another Session
      </Button>
    </div>
  );
}
