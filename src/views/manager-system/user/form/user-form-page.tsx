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
import { Link, useLocation } from 'react-router-dom';
import { useAppPath, useSpecificUserFetcher } from '@/hooks';
import { ChevronLeft, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { motion } from 'framer-motion';
import { ComboboxField } from '@/components/common/form-controls/combobox-field.tsx';
import useAppStore from '@/store/app-store.ts'; // Import framer-motion

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
  const { basePath } = useAppPath();
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
  const rolesInApp = useAppStore(state => state.rolesInApp);
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
      <div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}>
          <Link to={`${basePath}/user`} className="flex mb-2 hover:underline w-fit flex-row gap-2 items-center">
            <ChevronLeft className="w-5 h-5" />
            Trở lại
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col mb-2">
          <h2
            className="text-xl font-medium"

          >
            {isEdit ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}
          </h2>
          <h2 className="text-sm text-muted-foreground">
            Điền vào biểu mẫu để tạo mới người dùng. Các trường (*) là bắt buộc
          </h2>
        </motion.div>
        <Form {...form}>
          <form className="space-y-2 max-w-[500px]" onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <TextField
                name="fullName"
                label="Họ tên"
                placeholder="Nhập họ tên"
                require
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <TextField
                name="email"
                label="Email"
                placeholder="example@gmail.com"
                require
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <TextField
                name="userCode"
                label="Mã người dùng"
                placeholder="Nhập mã người dùng"
                require
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <ComboboxField
                name="role"
                label="Vai trò"
                placeholder="Chọn vai trò"
                data={rolesInApp}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }} // Add animation for buttons
              className="flex flex-row gap-2 pt-2"
            >
              <Button variant="secondary">
                Cancel
              </Button>
              <Button variant="outline">
                Lưu & tạo mới
              </Button>
              <Button>
                Lưu
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    );
  }
}
