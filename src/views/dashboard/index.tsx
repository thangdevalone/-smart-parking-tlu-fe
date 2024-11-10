import { ContentLayout } from '@/components/layouts';
import { Charts } from '@/views/dashboard/components';

const Dashboard = () => {
  return (
    <ContentLayout className="bg-background overflow-y-auto flex-1" title="Dashboard">
      <Charts />
    </ContentLayout>
  );
};
export default Dashboard;
