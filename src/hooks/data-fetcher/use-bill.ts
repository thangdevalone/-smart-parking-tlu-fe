import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Bill, type SuccessResponse } from '@/types';
import { ParsedQuery } from 'query-string';
import { billApi } from '@/api/billApi';

type UseRoleOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

interface IUseRole {
  options?: UseRoleOptions<Bill[]>,
  queryParam: ParsedQuery;
}

export const useBillFetcher = (props: IUseRole) => {
  const { options, queryParam } = props;
  return useQuery({
    ...options,
    queryKey: ['bill', queryParam],
    queryFn: async () => {
      const { data } = await billApi.getBills(queryParam);
      return data;
    },
  });
};




