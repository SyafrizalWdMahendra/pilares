import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex justify-center py-10">
    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
  </div>
);

export const LazyCourtSlotSelection = dynamic(
  () => import("./CourtSlotSelection"),
  { loading: () => <LoadingSpinner /> },
);

export const LazyTimeSlotSelection = dynamic(
  () => import("./TimeSlotSelection"),
  { loading: () => <LoadingSpinner /> },
);

export const LazyPaymentForm = dynamic(
  () => import("./PaymentForm").then((mod) => mod.PaymentForm),
  { loading: () => <LoadingSpinner /> },
);

export const LazyPaymentSuccess = dynamic(() => import("./SuccessView"), {
  loading: () => <LoadingSpinner />,
});
