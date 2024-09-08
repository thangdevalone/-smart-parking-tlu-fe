import { useEffect } from 'react';
import { useDialogStore } from '@/store/dialog-state-store.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cardApi } from '@/api/cardApi.ts';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form.tsx';
import { TextField } from '@/components/common/form-controls';
import { DialogClose, DialogFooter } from '@/components/ui/dialog.tsx';
import { cn } from '@/lib/utils.ts';
import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { KeyDialogs } from '@/constants';
import { DialogActionType } from '@/types';

const cardTypeSchema = z.object({
  cardTypeName: z.string().min(1, {
    message: 'Cần điền tên thẻ',
  }),
  cardTypePrice: z.number().min(1, {
    message: 'Cần điền giá thẻ theo tháng',
  }),
});

export type CardTypeValue = z.infer<typeof cardTypeSchema>;

export  function CardTypeForm() {
  const { closeDialog, dialogs } = useDialogStore();
  const queryClient = useQueryClient();

  const form = useForm<CardTypeValue>({
    resolver: zodResolver(cardTypeSchema),
    defaultValues: {
      cardTypeName: '',
      cardTypePrice: 0,
    },
  });

  const currentDialog = dialogs[KeyDialogs.cardType];
  const isEdit = currentDialog?.action === DialogActionType.EDIT;

  useEffect(() => {
    if (isEdit) {
      form.reset(currentDialog.data);
    }
  }, [isEdit, currentDialog?.data]);

  const mutation = useMutation({
    mutationFn: (variables: { id?: number; data: CardTypeValue }) => {
      return isEdit && variables.id
        ? cardApi.updateCardType(variables.id, variables.data)
        : cardApi.addCardType(variables.data);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['card-type'] }).then(() => {
        form.reset();
        toast.success(data.message);
        closeDialog(KeyDialogs.cardType);
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const onSubmit: SubmitHandler<CardTypeValue> = (values) => {
    mutation.mutate({
      id: isEdit ? currentDialog?.data?.id : undefined,
      data: values,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          name="cardTypeName"
          label="Tên loại thẻ"
          placeholder="Nhập tên loại thẻ"
          require
        />
        <TextField
          name="cardTypePrice"
          label="Giá theo tháng"
          placeholder="Nhập giá theo tháng"
          endIcon="đ"
          currencyVnd
          require
        />
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: 'outline' }))}>Cancel</DialogClose>
          <Button loading={mutation.isPending} type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
