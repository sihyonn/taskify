import { useQuery, useQueryClient } from '@tanstack/react-query';
import { API } from '@/constants/API';
import dashboardsApi from '@/api/dashboards.api';

function useLoadInvitationQuery({ dashboardId, page, size = 4 }) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [API.DASHBOARDS, page],
    queryFn: async () => {
      if (!dashboardId) return null;
      const { data } = await dashboardsApi.getDashboardInvitation({
        dashboardId,
        page,
        size,
      });
      return data;
    },
    onSuccess: () => {
      // 쿼리 무효화
      queryClient.invalidateQueries();
    },
  });
}

export default useLoadInvitationQuery;
