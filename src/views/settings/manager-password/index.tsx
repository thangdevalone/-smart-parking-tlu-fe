import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { PasswordField } from '@/components/common/form-controls';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import { useDialogStore } from '@/store/dialog-state-store';
import { KeyDialogs } from '@/constants';
import { useState } from 'react';
import { toast } from 'sonner';
import { authApi } from '@/api/authApi';

const passwordSchema = z.object({
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  passwordNew: z.string().min(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' }),
  passwordConfirm: z.string().min(6, { message: 'Xác nhận mật khẩu phải có ít nhất 6 ký tự' }),
}).refine(data => data.passwordNew === data.passwordConfirm, {
  message: 'Mật khẩu mới và xác nhận mật khẩu phải giống nhau',
  path: ['passwordConfirm'],
});

type passwordValue = z.infer<typeof passwordSchema>;

export const ManagerPassword = () => {
  const { dialogs, setDialogState } = useDialogStore();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<passwordValue>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      passwordNew: '',
      passwordConfirm: '',
    },
  });

  const handleSendMail = async () => {
    try {
      setLoading(true);
      const res = await authApi.forgotPasswordUser();
      toast.success(res.data.message || 'Link đổi mật khẩu đã được gửi vào gmail của bạn');
      setDialogState(KeyDialogs.resetPassowrdUser, { open: false });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleChangepasswordUser: SubmitHandler<passwordValue> = async (data) => {
    try {
      setLoading(true);
      const res = await authApi.changePassword(data);
      toast.success(res.data.message || 'Đổi mật khẩu thành công');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };


  return <div className="space-y-2">
    <div>
      <h3 className="text-lg font-medium">Quản lý mật khẩu</h3>
      <p className="text-sm text-muted-foreground">
        Bạn có thể thay đổi mật khẩu và quên mật khẩu ở đây
      </p>
    </div>
    <Dialog onOpenChange={(open) => setDialogState(KeyDialogs.resetPassowrdUser, { open })}
            open={dialogs[KeyDialogs.resetPassowrdUser]?.open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quên mật khẩu</DialogTitle>
          <DialogDescription>Mật khẩu mới sẽ được gửi về mail bạn đăng ký !</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
          <Button loading={loading} onClick={handleSendMail}>Gửi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleChangepasswordUser)} className="space-y-2  w-[40%]">
        <div className="grid grid-cols-1 lg:max-w-md gap-3 mb-3">
          <PasswordField
            name="password"
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            require
            autoComplete="password"
          />
          <PasswordField
            name="passwordNew"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            require
            autoComplete="password"
          />
          <PasswordField
            name="passwordConfirm"
            label="Xác thực mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            require
            autoComplete="password"
          />
          <i className="underline text-sm cursor-pointer" onClick={() => setDialogState(KeyDialogs.resetPassowrdUser, {
            open: true,
          })}>
            Bạn đã quên mật khẩu?
          </i>
          <Button loading={loading} className="w-[30%]" type="submit">Đổi mật khẩu</Button>
        </div>
      </form>
    </Form>
  </div>;
};