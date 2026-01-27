import { InfoRowProps } from "@/src/lib/reservationData";

export default function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="w-5 h-5 text-[#3f6489]" />
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-medium text-gray-900">{value}</div>
      </div>
    </div>
  );
}
