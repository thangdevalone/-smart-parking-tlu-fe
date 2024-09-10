import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { useState } from 'react';

export interface DataCombobox {
  id: number,
  value: string,
}

interface ComboboxFieldProps {
  label: string;
  name: string;
  disabled?: boolean;
  placeholder: string;
  autoComplete?: string;
  require?: boolean;
  data: DataCombobox[];
}

export const ComboboxField = (props: ComboboxFieldProps) => {
  const {
    name,
    label,
    disabled = false,
    placeholder,
    require = false,
    data,
  } = props;

  const form = useFormContext();
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <div>
                    <Button
                      variant="outline"
                      disabled={disabled}
                      type="button"
                      aria-expanded={open}
                      role="combobox"
                      className={cn(
                        'w-full capitalize justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? data.find(
                          (item) => String(item.id) === field.value,
                        )?.value
                        : placeholder}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="center" className="popover-content-width-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>Not found</CommandEmpty>
                    <CommandGroup>
                      {data.map((item) => (
                        <CommandItem
                          value={String(item.id)}
                          key={item.id}
                          className="capitalize"
                          onSelect={() => {
                            form.setValue(name, String(item.id));
                            setOpen(false);
                          }}
                        >
                          {item.value}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              String(item.id) === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
