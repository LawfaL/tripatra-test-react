import React, { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

interface FormControllerProps {
  description?: string;
  label: string;
  name: string;
  placeholder: string;
  isDisable?: boolean;
  type: HTMLInputTypeAttribute;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const FormControllerMemo: React.FC<FormControllerProps> = ({
  description,
  label,
  name,
  placeholder,
  type,
  rules,
  isDisable = false
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} disabled={isDisable} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormController = React.memo(FormControllerMemo);
