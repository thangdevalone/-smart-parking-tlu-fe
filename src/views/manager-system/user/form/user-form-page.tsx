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
import { Check, ChevronLeft, Eye, LoaderCircle, Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { motion } from 'framer-motion';
import { ComboboxField } from '@/components/common/form-controls/combobox-field.tsx';
import { authApi } from '@/api/authApi.ts';
import useComboboxStateStore from '@/store/combobox-state-store.ts';
import { useEffect } from 'react';

const userSchema = z.object({
  fullName: z.string().min(1, { message: 'Cần điền họ tên' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  userCode: z.string().min(1, { message: 'Mã người dùng không được để trống' }),
  role: z.string().min(1, { message: 'Vai trò không được để trống' }),
});

export type UserValue = z.infer<typeof userSchema>;

export default function UserFormPage() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { basePath, navigateAppPath } = useAppPath();
  const param = queryString.parse(location.search);
  const form = useForm<UserValue>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: '',
      email: '',
      userCode: '',
    },
  });
  const type = param?.type || DialogActionType.CREATE;
  const isEdit = type === DialogActionType.EDIT;
  const isView = type === DialogActionType.VIEW;

  const { data, isFetching, isSuccess } = useSpecificUserFetcher({
    options: { refetchOnWindowFocus: false, enabled: !!param?.id, retry: false, gcTime: 10000, staleTime: 5000 },
    id: String(param?.id),
  });

  useEffect(() => {
    if (data && isSuccess && param?.id) {
      const { fullName, email, role, userCode } = data.data;
      form.reset({
        fullName,
        email,
        role: String(role.id),
        userCode,
      });
    }
  }, [data, isSuccess, param?.id, form]);

  const rolesInApp = useComboboxStateStore(state => state.rolesInApp);
  const mutation = useMutation({
    mutationFn: (variables: { id?: number; data: UserValue }) => {
      return isEdit && variables.id
        ? userApi.updateUser(variables.id, variables.data)
        : authApi.register(variables.data);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['user'] }).then(() => {
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

  const handleSaveAndCreateNew = () => {
    form.handleSubmit(onSubmit)().then(() => {
      if (mutation.isSuccess) {
        form.reset();
        if (isEdit) {
          navigateAppPath(['user', `form?type=view&id=${param.id}`]);
        }
      }
    });
  };

  const handleSave = () => {
    form.handleSubmit(onSubmit)().then(() => {
      if (mutation.isSuccess) {
        form.reset();
        navigateAppPath(['user']);
      }
    });
  };

  const renderButtons = () => {
    if (type === DialogActionType.VIEW) {
      return (
        <Button
          onClick={() => navigateAppPath(['user', `form?type=edit&id=${param.id}`])}
          variant="outline"
          icon={<Pencil className="w-4 h-4 mr-2" />}
        >
          Chỉnh sửa
        </Button>
      );
    }

    if (type === DialogActionType.CREATE || type === DialogActionType.EDIT) {
      return (
        <>
          {type === DialogActionType.CREATE && (
            <>
              <Button
                onClick={() => navigateAppPath(['user'])}
                variant="secondary"
              >
                Hủy
              </Button>
              <Button
                loading={mutation.isPending}
                type="button"
                onClick={handleSaveAndCreateNew}
                icon={<Plus className="w-4 h-4 mr-2" />}
                variant="outline"
              >
                Lưu & tạo mới
              </Button>
            </>
          )}
          {type === DialogActionType.EDIT && (
            <>
              <Button
                onClick={() => navigateAppPath(['user', `form?type=view&id=${param.id}`])}
                variant="outline"
              >
                Hủy
              </Button>
              <Button
                loading={mutation.isPending}
                type="button"
                onClick={handleSaveAndCreateNew}
                icon={<Eye className="w-4 h-4 mr-2" />}
                variant="outline"
              >
                Lưu & xem
              </Button>
            </>
          )}
          <Button
            loading={mutation.isPending}
            type="button"
            icon={<Check className="w-4 h-4 mr-2" />}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </>
      );
    }
    return null;
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
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Link to={`${basePath}/user`} className="flex mb-2 hover:underline w-fit flex-row gap-2 items-center">
            <ChevronLeft className="w-5 h-5" />
            Trở lại
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col mb-2"
        >
          <h2 className="text-xl font-medium">
            {isEdit ? 'Cập nhật người dùng' : isView ? 'Thông tin người dùng' : 'Thêm mới người dùng'}
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
                disabled={isView}
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
                type="email"
                disabled={isView}
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
                disabled={isView}
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
                disabled={isView}
                label="Vai trò"
                placeholder="Chọn vai trò"
                data={rolesInApp}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-row gap-2 pt-2"
            >
              {renderButtons()}
            </motion.div>
          </form>
        </Form>
      </div>
    );
  }

  return null;
}
