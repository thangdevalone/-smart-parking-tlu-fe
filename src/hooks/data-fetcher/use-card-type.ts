import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { cardApi } from '@/api/cardApi.ts';
import { CardType, type SuccessResponse } from '@/types';
import { ParsedQuery } from 'query-string';

type UseCardTypeOptions = Omit<UseQueryOptions<SuccessResponse<CardType[]>>, 'queryFn' | 'queryKey'>

interface IUseCardType {
  options?: UseCardTypeOptions,
  queryParam: ParsedQuery;
}

export const useCardTypeFetcher = (props: IUseCardType) => {
  const { options, queryParam } = props;
  return useQuery({
    ...options,
    queryKey: ['card-type', queryParam],
    queryFn: async () => {
      const { data } = await cardApi.getCardTypes(queryParam);
      return data;
    },
  });
};
