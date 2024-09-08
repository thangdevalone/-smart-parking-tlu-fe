import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cardApi } from '@/api/cardApi.ts';
import { toast } from 'sonner';

interface ICardTypeDelete {
  handleSuccess?: () => void,
  handleError?: () => void;
}

export const useCardTypeDelete = (props?: ICardTypeDelete) => {
  const handleSuccess = props?.handleSuccess;
  const handleError = props?.handleError;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cardApi.deleteCardType,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['card-type'] }).then(() => {
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
