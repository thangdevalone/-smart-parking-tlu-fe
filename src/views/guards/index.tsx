import React from 'react';
import CameraGroup from '@/views/guards/components/camera-group.tsx';
import ActionGroup from '@/views/guards/components/action-group.tsx';
import HistoryGroup from '@/views/guards/components/history-group.tsx';
import StatisticGroup from '@/views/guards/components/statistic-group.tsx';


const GuardViews: React.FC = () => {
  return (
    <main className="h-[calc(100vh_-_70px)] flex flex-row">
      <div className="grid grid-cols-2 w-full">
        <div className="grid grid-rows-5 h-full min-h-0">
          <div className="row-span-3 border-b">
            <CameraGroup />
          </div>
          <div className="row-span-2 p-4 xl:block hidden">
            <ActionGroup />
          </div>
        </div>
        <div className="grid xl:grid-cols-2">
          <div className="border-l flex flex-col xl:border-r">
            <div className="flex-1">
              <HistoryGroup />
            </div>
            <div className="row-span-2 p-4 xl:hidden border-t block">
              <ActionGroup />
            </div>
          </div>
          <div className="p-3 hidden xl:block">
            <StatisticGroup />
          </div>
        </div>
      </div>
    </main>
  );
};

export default GuardViews;