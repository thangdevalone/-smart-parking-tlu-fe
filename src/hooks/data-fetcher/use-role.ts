import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Role, type SuccessResponse } from '@/types';
import { ParsedQuery } from 'query-string';
import { roleApi } from '@/api/role';

type UseRoleOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

interface IUseRole {
  options?: UseRoleOptions<Role[]>,
  queryParam: ParsedQuery;
}

export const useRoleFetcher = (props: IUseRole) => {
  const { options, queryParam } = props;
  return useQuery({
    ...options,
    queryKey: ['role', queryParam],
    queryFn: async () => {
      const { data } = await roleApi.getRoles(queryParam);
      return data;
    },
  });
};


interface ISpecificRoleFetcher {
  options?: UseRoleOptions<Role>,
  id?: string;
}


export const useSpecificRoleFetcher = (props: ISpecificRoleFetcher) => {
  const { options, id } = props;
  return useQuery({
    ...options,
    queryKey: ['user', { id }],
    queryFn: async () => {
      const { data } = await roleApi.getSpecificRole(id);
      return data;
    },
  });
};
