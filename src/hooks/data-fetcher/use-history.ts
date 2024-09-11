import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { History,  type SuccessResponse } from '@/types';
import { ParsedQuery } from 'query-string';
import { historyApi } from '@/api/historyApi';

type UseRoleOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

interface IUseRole {
  options?: UseRoleOptions<History[]>,
  queryParam: ParsedQuery;
}

export const useHistoryFetcher = (props: IUseRole) => {
  const { options, queryParam } = props;
  return useQuery({
    ...options,
    queryKey: ['history', queryParam],
    queryFn: async () => {
      const { data } = await historyApi.getHistories(queryParam);
      return data;
    },
  });
};




