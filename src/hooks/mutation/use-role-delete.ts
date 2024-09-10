import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { roleApi } from '@/api/role';

interface IRoleDelete {
  handleSuccess?: () => void,
  handleError?: () => void;
}

export const useRoleDelete = (props?: IRoleDelete) => {
  const handleSuccess = props?.handleSuccess;
  const handleError = props?.handleError;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roleApi.deleteRole,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['role'] }).then(() => {
        toast.success(data.message);
        if (handleSuccess) {
          handleSuccess();
        }
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
      if (handleError) {
        handleError();
      }
    },
  });
};
