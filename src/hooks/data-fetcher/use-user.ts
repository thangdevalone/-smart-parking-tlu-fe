import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { type SuccessResponse, User } from '@/types';
import { ParsedQuery } from 'query-string';
import { userApi } from '@/api/userApi.ts';

type UseUserOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

interface IUseUser {
  options?: UseUserOptions<User[]>,
  queryParam: ParsedQuery;
}

export const useUserFetcher = (props: IUseUser) => {
  const { options, queryParam } = props;
  return useQuery({
    ...options,
    queryKey: ['user', queryParam],
    queryFn: async () => {
      const { data } = await userApi.getUsers(queryParam);
      return data;
    },
  });
};

interface ISpecificUserFetcher {
  options?: UseUserOptions<User>,
  id?: string;
}

export const useSpecificUserFetcher = (props: ISpecificUserFetcher) => {
  const { options, id } = props;
  return useQuery({
    ...options,
    queryKey: ['user', { id }],
    queryFn: async () => {
      const { data } = await userApi.getSpecificUser(id);
      return data;
    },
  });
};
