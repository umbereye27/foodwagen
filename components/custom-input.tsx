      "use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  className,
  placeholder,
  type = "text",
  ...field
}) => {
  const { error } = useFormField();
  const id = field.name || field.id || `input-${label.toLowerCase()}`;

  return (
    <FormItem className="space-y-1">
      <FormLabel
        htmlFor={id}
        className="my-0 text-sm font-semibold text-gray-text-strong/90"
      >
        {label}
      </FormLabel>
      <FormControl>
        <Input
          {...field}
          id={id}
          name={field.name}
          type={type}
          aria-label={label}
          data-error={!!error}
          placeholder={placeholder || "Type here..."}
          className={cn(
            "w-full h-10 bg-gray-100 rounded-md py-2 px-3 data-[error=true]:border-destructive data-[error=true]:ring-destructive/20",
            className
          )}
        />
      </FormControl>
      <FormMessage className="transition-all -mt-1 text-xs" />
    </FormItem>
  );
};
