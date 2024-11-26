import { useDialogStore } from '@/store/dialog-state-store.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form.tsx';
import { SelectionField, TextField } from '@/components/common/form-controls';
import { DialogClose, DialogFooter } from '@/components/ui/dialog.tsx';
import { cn } from '@/lib/utils.ts';
import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { KeyDialogs } from '@/constants';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { userApi } from '@/api/userApi.ts';
import { SelectItem } from '@/components/ui/select.tsx';
import { billApi } from '@/api/billApi.ts';

const billSchema = z.object({
  user: z.string().min(1, {
    message: 'Cần chọn người dùng',
  }),
  price: z.number().min(1, {
    message: 'Cần nhập giá tiền',
  }),
});


export type BillValue = z.infer<typeof billSchema>;

export function BillForm() {
  const { closeDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const [users, setUsers] = useState<User[] | []>([]);
  const form = useForm<BillValue>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      user: '',
      price: 0,
    },
  });

  const fetchUsers = async () => {
    const users = await userApi.getUsers();

    setUsers(users.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const mutation = useMutation({
    mutationFn: (variables: { id?: number; data: BillValue }) => {
      return billApi.createTransaction(variables.data);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['bill'] }).then(() => {
        form.reset();
        toast.success(data.message);
        closeDialog(KeyDialogs.bill);
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const onSubmit: SubmitHandler<BillValue> = (values) => {
    mutation.mutate({
      data: values,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <SelectionField require label="Người thanh toán" name="user" placeholder="Select a user">
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id + ''}>
              {user.fullName}
            </SelectItem>
          ))}
        </SelectionField>
        <TextField
          name="price"
          label="Tiền thanh toán"
          placeholder="Nhập giá tiền thanh ttoansf"
          endIcon="đ"
          currencyVnd
          require
        />
        <DialogFooter className="pt-2">
          <DialogClose className={cn(buttonVariants({ variant: 'outline' }))}>Huỷ</DialogClose>
          <Button loading={mutation.isPending} type="submit">{'Tạo'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
