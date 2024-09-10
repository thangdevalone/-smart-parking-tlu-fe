import { PasswordField, TextField } from '@/components/common/form-controls';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/auth-store.ts';


const loginSchema = z.object({
  userCode: z.string().min(1, {
    message: 'Cần nhập mã người dùng',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu tối thiểu 6 kí tự',
  }),
});
type loginValue = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<loginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userCode: '',
      password: '',
    },
  });

  async function onSubmit(values: loginValue) {
    await login(values, navigate);
  }

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          name="userCode"
          label="Mã người dùng"
          placeholder="Nhập mã người dùng"
          require
        />
        <PasswordField
          name="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          require
          autoComplete="password"
        />
        <div className="text-end">
          <Link to="/forgot-password" className="italic text-sm hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
        <Button className="w-full" type="submit" loading={loading}>
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};
