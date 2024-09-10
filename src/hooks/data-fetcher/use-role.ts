import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Role, type SuccessResponse } from '@/types';
import { ParsedQuery } from 'query-string';
import { roleApi } from '@/api/roleApi.ts';
import { DataCombobox } from '@/components/common/form-controls/combobox-field.tsx';

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


interface IUseAllRole {
  options?: UseRoleOptions<DataCombobox[]>,
}

export const useAllRoleFetcher = (props: IUseAllRole) => {
  const { options } = props;
  return useQuery({
    ...options,
    queryKey: ['role-all'],
    queryFn: async () => {
      const { data } = await roleApi.getAllRole();
      return data;
    },
  });
};

