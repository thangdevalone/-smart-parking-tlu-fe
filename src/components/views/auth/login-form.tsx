import { PasswordField, TextField } from '@/components/common/form-controls';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
const loginSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});
type loginValue = z.infer<typeof loginSchema>;
export const LoginForm = () => {
  const form = useForm<loginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
    },
  });
  function onSubmit(values: loginValue) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField name="username" label="Tên đăng nhập" placeholder="Nhập tên đăng nhập" require />
        <PasswordField
          name="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          require
          autoComplete="password"
        />
        <div className="text-end italic text-sm">Quên mật khẩu?</div>
        <Button type="submit">Đăng nhập</Button>
      </form>
    </Form>
  );
};
