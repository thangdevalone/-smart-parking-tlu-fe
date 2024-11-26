import { useEffect, useState } from 'react';
import { useDialogStore } from '@/store/dialog-state-store.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cardApi } from '@/api/cardApi.ts';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form.tsx';
import { SelectionField, TextField } from '@/components/common/form-controls';
import { DialogClose, DialogFooter } from '@/components/ui/dialog.tsx';
import { cn } from '@/lib/utils.ts';
import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { KeyDialogs } from '@/constants';
import { CardType, DialogActionType } from '@/types';
import { SelectItem } from '@/components/ui/select';

const cardSchema = z.object({
  cardCode: z.string().min(1, {
    message: 'Cần điền tên thẻ',
  }),
  cardType: z.string().min(1, {
    message: 'Cần chọn loại thẻ',
  }),
  idCard: z.string().min(1, {
    message: 'Cần nhập mã thẻ',
  }),
  cardStatus: z.enum(['active', 'inactive']).default('active'),
});

const statusOptions = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Khoá' },
];

export type CardValue = z.infer<typeof cardSchema>;

export function CardForm() {
  const { closeDialog, dialogs } = useDialogStore();
  const queryClient = useQueryClient();
  const [cardTypes, setCardTypes] = useState<CardType[] | []>([]);

  const fetchData = async () => {
    const cardTypes = await cardApi.getCardTypes();
    setCardTypes(cardTypes.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<CardValue>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardCode: '',
      cardType: '',
    },
  });

  const currentDialog = dialogs[KeyDialogs.card];
  const isEdit = currentDialog?.action === DialogActionType.EDIT;

  useEffect(() => {
    if (isEdit) {
      const data = currentDialog.data;
      form.setValue('idCard', data?.idCard);
      form.setValue('cardType', data?.cardType.id + '');
      form.setValue('cardCode', data?.cardCode);
      form.setValue('cardStatus', data?.cardStatus);

    }
  }, [isEdit, currentDialog?.data]);

  const mutation = useMutation({
    mutationFn: (variables: { id?: number; data: CardValue }) => {
      return isEdit && variables.id
        ? cardApi.updateCard(variables.id, variables.data)
        : cardApi.addCard(variables.data);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['card'] }).then(() => {
        form.reset();
        toast.success(data.message);
        closeDialog(KeyDialogs.card);
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const onSubmit: SubmitHandler<CardValue> = (values) => {
    mutation.mutate({
      id: isEdit ? currentDialog?.data?.id : undefined,
      data: values,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          name="cardCode"
          label="Tên thẻ"
          placeholder="Nhập tên thẻ"
          require
        />
        <TextField
          name="idCard"
          label="Mã thẻ"
          placeholder="Nhập tên thẻ"
          require
        />
        <SelectionField require label="Loại thẻ" name="cardType" placeholder="Select a card type">
          {cardTypes.map((cardType) => (
            <SelectItem key={cardType.id} value={cardType.id + ''}>
              {cardType.cardTypeName}
            </SelectItem>
          ))}
        </SelectionField>
        <SelectionField label="Trạng thái" defaultValue="active" name="cardStatus" placeholder="Select a status">
          {statusOptions.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectionField>
        <DialogFooter className="pt-2">
          <DialogClose className={cn(buttonVariants({ variant: 'outline' }))}>Huỷ</DialogClose>
          <Button loading={mutation.isPending} type="submit">{isEdit ? 'Cập nhật' : 'Tạo'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
