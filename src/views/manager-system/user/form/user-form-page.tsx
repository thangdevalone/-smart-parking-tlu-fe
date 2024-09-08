import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form.tsx';
import { TextField } from '@/components/common/form-controls';
import { toast } from 'sonner';
import { userApi } from '@/api/userApi.ts';
import queryString from 'query-string';
import { DialogActionType } from '@/types/app.ts';
import { useLocation } from 'react-router-dom';
import { useSpecificUserFetcher } from '@/hooks';
import { LoaderCircle } from 'lucide-react';

const userSchema = z.object({
  fullName: z.string().min(1, {
    message: 'Cần điền họ tên',
  }),
  phone: z.string()
    .min(1, { message: 'Số điện thoại không được để trống' })
    .regex(/^(?:\+84|0)[1-9]\d{8,9}$/, {
      message: 'Số điện thoại không hợp lệ',
    }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  userCode: z.string().min(1, { message: 'Mã người dùng không được để trống' }),
  role: z.string().min(1, { message: 'Vai trò không được để trống' }),
});

export type UserValue = z.infer<typeof userSchema>;

export default function UserFormPage() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const param = queryString.parse(location.search);
  const form = useForm<UserValue>({
    resolver: zodResolver(userSchema),
  });
  const type = param?.type || DialogActionType.CREATE;
  const isEdit = type === DialogActionType.EDIT;
  const { data, isFetching } = useSpecificUserFetcher({
    options: { refetchOnWindowFocus: false, enabled: !!param?.id, retry: false },
    id: String(param?.id),
  });

  const mutation = useMutation({
    mutationFn: (variables: { id?: number; data: UserValue }) => {
      return isEdit && variables.id
        ? userApi.updateUser(variables.id, variables.data)
        : userApi.addUser(variables.data);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['user'] }).then(() => {
        form.reset();
        toast.success(data.message);
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const onSubmit: SubmitHandler<UserValue> = (values) => {
    mutation.mutate({
      id: isEdit ? data?.data.id : undefined,
      data: values,
    });
  };

  if (isFetching) {
    return (
      <div>
        <LoaderCircle className="w-4 h-4 animate-spin" />
      </div>
    );
  }
  if (!isFetching && ((isEdit && data) || !isEdit)) {
    return (
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <TextField
            name="fullName"
            label="Họ tên"
            placeholder="Nhập họ tên"
            require
          />
          <TextField
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            require
          />
          <TextField
            name="userCode"
            label="Mã người dùng"
            placeholder="Nhập mã người dùng"
            require
          />
          <TextField
            name="role"
            label="Chọn role"
            placeholder="example@gmail.com"
            require
          />

        </form>
      </Form>
    );
  }
}
