import { paymentsApi } from '@/api/payments.ts';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ContentLayout } from '@/components/layouts';
import LoopPattern from '@/assets/loop-pattern.png';
import { ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { KeyDialogs } from '@/constants';
import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { useDialogStore } from '@/store/dialog-state-store.ts';
import { Form } from '@/components/ui/form.tsx';
import { TextField } from '@/components/common/form-controls';
import { cn } from '@/lib/utils.ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const paymentSchema = z.object({
  price: z.number().min(1, {
    message: 'Cần nhập tiền chuyển khoản',
  }),
});
type PaymentValue = z.infer<typeof paymentSchema>;
export const Payment = () => {
  const location = useLocation();
  const form = useForm<PaymentValue>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      price: 0,
    },
  });
  const getQueryParams = (search: string) => {
    const params = new URLSearchParams(search);
    return {
      statusPayment: params.get('statusPayment'),
    };
  };

  const { statusPayment } = getQueryParams(location.search);
  useEffect(() => {
    if (statusPayment) {
      if (statusPayment === '00') toast.success('Gia hạn thành công');
      if (statusPayment === '04') toast.error('Gia hạn không thành công');
    }
  }, []);

  const handleCreatePaymentVNP = async (value: PaymentValue) => {
    try {
      const result = await paymentsApi.createPaymentVNP(value.price);
      if (result.data.data) window.location.href = result.data.data;
    } catch (error) {
    }
  };
  const { setDialogState, dialogs } = useDialogStore();


  return (
    <ContentLayout title="Thanh toán">
      <div className="flex">
        <Dialog
          onOpenChange={(open) => setDialogState(KeyDialogs.paymentVNpay, { open })}
          open={dialogs[KeyDialogs.paymentVNpay]?.open}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm mới loại thẻ</DialogTitle>
              <DialogDescription>Điền giá trị vào mẫu để tạo loại thẻ.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form className="space-y-2" onSubmit={form.handleSubmit(handleCreatePaymentVNP)}>
                <TextField
                  name="price"
                  label="Số tiền chuyển khoaản"
                  placeholder="Nhập số tiền chuyển khoaản"
                  endIcon="đ"
                  currencyVnd
                  require
                />
                <DialogFooter className="pt-2">
                  <DialogClose className={cn(buttonVariants({ variant: 'outline' }))}>Cancel</DialogClose>
                  <Button type="submit">Chuyển tới trang chuyển khoản</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <div
          className={'dark:bg-gradient-secondary-light bg-white  border overflow-hidden shadow dark:border-secondary-alpha20 rounded-[24px] h-32 p-4 relative flex flex-row gap-4'}>
          <img
            src={LoopPattern} alt={'dots'}
            className={'h-44 absolute z-0 -top-4 -left-6 self-start'}
          />
          <div className={'content z-10 flex-1'}>
            <div className={'text-lg font-bold dark:text-neutral-100'}>
              Thanh toán VNPAY
            </div>
            <div className={'text-b-3 dark:text-neutral-500 text-muted-foreground'}>
              Thanh toán online <br />
              dễ dàng, uy tín!
            </div>
          </div>
          <div
            onClick={() => setDialogState(KeyDialogs.paymentVNpay, { open: true })}
            className={'z-20 bg-secondary-alpha20 self-center w-[48px] h-[38px] cursor-pointer ml-5 rounded-full flex items-center justify-center'}>
            <ArrowRight className={'w-5 h-5 dark:stroke-[#0DF2E8]'} />
          </div>
        </div>
      </div>

    </ContentLayout>
  );
};
