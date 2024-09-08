import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { ChangeEvent, ReactNode } from 'react';
import { CurrencyFormatter } from '@/lib/currency-formater.ts';

interface TextFieldProps {
  label: string;
  name: string;
  disabled?: boolean;
  placeholder: string;
  autoComplete?: string;
  require?: boolean;
  type?: string;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  currencyVnd?: boolean;
}

export const TextField = (props: TextFieldProps) => {
  const {
    name,
    label,
    disabled = false,
    placeholder,
    autoComplete = 'off',
    require = false,
    type = 'text',
    endIcon,
    startIcon,
    currencyVnd = false,
  } = props;

  const { control } = useFormContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>, onChange: (value: number | string) => void) => {
    const value = event.target.value;
    let formattedValue: number | string = '';

    if (currencyVnd) {
      formattedValue = CurrencyFormatter.toNumber(CurrencyFormatter.format(value));
    } else {
      formattedValue = value;
    }

    onChange(formattedValue);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="relative">
            {label}
            {require && (
              <span className="text-xl absolute top-[-5px] right-[-10px] text-[red]"> *</span>
            )}
          </FormLabel>
          <FormControl>
            <Input
              endIcon={endIcon}
              startIcon={startIcon}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              value={currencyVnd ? CurrencyFormatter.format(field.value.toString()  ) : field.value}
              onChange={(e) => handleChange(e, field.onChange)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
