import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form.tsx';
import { TextField } from '@/components/common/form-controls';
import { toast } from 'sonner';
import { DialogActionType } from '@/types/app.ts';
import { roleApi } from '@/api/roleApi.ts';

import { Button, buttonVariants } from '@/components/ui/button';
import { useEffect } from 'react';
import { KeyDialogs } from '@/constants';
import { useDialogStore } from '@/store/dialog-state-store';
import { DialogClose, DialogFooter } from '@/components/ui/dialog.tsx';
import { cn } from '@/lib/utils';

const roleSchema = z.object({
  name: z.string().min(2, {
    message: 'Cần điền tên vai trò',
  }),
  description: z.string().optional(),
});

export type RoleValue = z.infer<typeof roleSchema>;

export default function RoleForm() {
  const { closeDialog, dialogs } = useDialogStore();
  const queryClient = useQueryClient();

  const form = useForm<RoleValue>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      description: '',
    }
  });

  const currentDialog = dialogs[KeyDialogs.role];
  const isEdit = currentDialog?.action === DialogActionType.EDIT;

  useEffect(() => {
    if (isEdit) {
      console.log('currentDialog.data', currentDialog.data);
      form.reset(currentDialog.data);
    }
  }, [isEdit, currentDialog?.data]);

  const mutation = useMutation({
    mutationFn: (variables: { id?: number; data: RoleValue }) => {
      return isEdit && variables.id
        ? roleApi.updateRole(variables.id, variables.data)
        : roleApi.addRole(variables.data);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['role'] }).then(() => {
        form.reset();
        toast.success(data.message);
        closeDialog(KeyDialogs.role);
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const onSubmit: SubmitHandler<RoleValue> = (values) => {
    mutation.mutate({
      id: isEdit ? currentDialog?.data.id : undefined,
      data: values,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          name="name"
          label="Tên vai trò"
          placeholder="Nhập tên vai trò.."
          require
        />
        <TextField
          name="description"
          label="Nhập miêu tả"
          placeholder="Nhập miêu tả.."
        />
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: 'outline' }))}>Cancel</DialogClose>
          <Button loading={mutation.isPending} type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
