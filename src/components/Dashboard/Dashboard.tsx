import { FC } from 'react';

import { useNavigationStore } from 'store';

import TopPanel from './TopPanel';
import Navigation from './Navigation';

import * as S from './style';

interface DashboardProps {
  breadcrumb?: Record<string, any>[];
}

const Dashboard: FC<DashboardProps> = ({ breadcrumb, children }) => {
  const { isFullview } = useNavigationStore();

  return (
    <div data-testid="dashboard-wrapper-id">
      <TopPanel breadcrumb={breadcrumb} />
      <Navigation />
      <S.DashboardContent show={isFullview}>
        <div>{children}</div>
      </S.DashboardContent>
    </div>
  );
};

export default Dashboard;
