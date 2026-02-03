import { FieldValues } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/src/lib/utils";
import { FormInputProps } from "@/src/lib/reservationData";

export const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  icon: Icon,
  className,
  ...props
}: FormInputProps<T>) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        )}

        <Input
          id={name}
          {...register(name)}
          {...props}
          className={cn(
            Icon ? "pl-10" : "",
            error ? "border-red-500 focus-visible:ring-red-500" : "",
          )}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 animate-in slide-in-from-top-1">
          {error.message}
        </p>
      )}
    </div>
  );
};
