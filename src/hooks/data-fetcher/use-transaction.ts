import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { type SuccessResponse, Transaction } from '@/types';
import { ParsedQuery } from 'query-string';
import { billApi } from '@/api/billApi.ts';

type UseRoleOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

interface IUseRole {
  options?: UseRoleOptions<Transaction[]>,
  queryParam: ParsedQuery;
}

export const useTransactionFetcher = (props: IUseRole) => {
  const { options, queryParam } = props;
  return useQuery({
    ...options,
    queryKey: ['history', queryParam],
    queryFn: async () => {
      const { data } = await billApi.getTransaction(queryParam);
      return data;
    },
  });
};




