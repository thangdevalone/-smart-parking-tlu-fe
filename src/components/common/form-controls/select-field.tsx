import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";

interface SelectionFieldProps {
  label?: string;
  name: string;
  disabled?: boolean | undefined;
  placeholder: string;
  children: ReactNode;
  defaultValue?: string;
  require?: boolean;
}

export const SelectionField = (props: SelectionFieldProps) => {
  const { name, label = null, disabled = false, placeholder, defaultValue, require } = props;
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="relative">
            {label}
            {require && (
              <span className="text-xl absolute top-[-5px] right-[-10px] text-[red]"> *</span>
            )}
          </FormLabel>
          <FormControl>
            <Select
              disabled={disabled}
              onValueChange={field.onChange}
              {...field}
              defaultValue={defaultValue}
            >
              <SelectTrigger {...field} className="">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {props.children}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
