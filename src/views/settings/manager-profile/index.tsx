import { TextField } from '@/components/common/form-controls';
import { Avatar, AvatarImage } from '@/components/ui/avatar.tsx';
import defaultAvatar from '@/assets/default-avatar.png';
import useAuthStore from '@/store/auth-store.ts';
import { useEffect, useState } from 'react';
import z from 'zod';
import { Separator } from '@/components/ui/separator.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { userApi } from '@/api/userApi.ts';
import { toast } from 'sonner';

const InfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().regex(/^0[3|5|7|8|9][0-9]{8}$/, 'Invalid phone number format').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be at most 15 digits'),
  email: z.string().email('Invalid email address'),
  userCode: z.string().min(1, 'User code is required'),
});

type InfoType = z.infer<typeof InfoSchema>;
export const ManagerProfile = () => {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const formEdit = useForm<InfoType>({
    resolver: zodResolver(InfoSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      userCode: '',
    },
  });
  useEffect(() => {
    if (user) {
      formEdit.setValue('fullName', user.fullName);
      formEdit.setValue('phone', user.phone);
      formEdit.setValue('email', user.email);
      formEdit.setValue('userCode', user.userCode);
    }
  }, []);
  const handleEdit = (data: InfoType) => {
    (async () => {
      try {
        if (!user) return;
        setLoading(true);
        const fetcher = await userApi.updateUser(user?.id, data);
        updateUser(fetcher.data.data);
        toast.success(fetcher.data.message);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông tin cá nhân</h3>
        <p className="text-sm text-muted-foreground">
          Sửa đổi cập nhật thông tin để chúng tôi có thể liên hệ bạn bất cứ lúc nào
        </p>
      </div>
      <Separator />
      <div />
      <Form {...formEdit}>
        <form onSubmit={formEdit.handleSubmit(handleEdit)}>
          <div className="flex flex-row gap-10">
            <div>
              <div className="ml-1 mr-3">
                <div className="mb-3">
                  <p className="mb-2 text-lg font-semibold">Thông tin chung</p>
                  <div className="flex flex-row gap-5">
                    <div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <TextField
                          name="fullName"
                          label="Họ và tên"
                          placeholder="Nhập họ tên"
                          require={true}
                        />
                        <TextField
                          name="email"
                          label="Email"
                          placeholder="Nhập email"
                          require={true}
                          type="email"
                        />
                        <TextField
                          name="phone"
                          label="Số điện thoại"
                          placeholder="Nhập số điện thoại"
                        />
                        <TextField
                          name="userCode"
                          label="Tên đăng nhập"
                          placeholder="Nhập tên đăng nhập"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-start my-4 mr-3">
                <p className="text-muted-foreground text-sm mb-3">
                  Lưu ý: Tất cả các trường trên trang này là tùy chọn và có thể bị
                  xóa bất kỳ lúc nào và bằng cách điền vào chúng, bạn đồng ý cho
                  chúng tôi chia sẻ dữ liệu này cho người quản lí và những người
                  cấp trên của bạn.
                </p>
                <Button loading={loading} type="submit">
                  Cập nhật hồ sơ
                </Button>
              </div>
            </div>
            <div className="relative ml-20 w-fit h-fit">
              <Avatar className="w-[150px] border h-[150px]">
                <AvatarImage src={defaultAvatar} alt="Avatar" />
              </Avatar>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};