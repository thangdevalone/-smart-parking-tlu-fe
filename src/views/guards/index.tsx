import React, { useEffect, useState } from 'react';
import CameraGroup from '@/views/guards/components/camera-group.tsx';
import ActionGroup from '@/views/guards/components/action-group.tsx';
import HistoryGroup from '@/views/guards/components/history-group.tsx';
import StatisticGroup from '@/views/guards/components/statistic-group.tsx';
import { off, onValue, ref, set } from 'firebase/database';
import { database } from '@/firebase.ts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { appConfig } from '@/configs';
import { ToggleGateInButton, ToggleGateOutButton } from '@/views/guards/components/action.tsx';
import { cardApi } from '@/api/cardApi.ts';


const GuardViews: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [gateInCard, setGateInCard] = useState<string>('');
  const [gateOutCard, setGateOutCard] = useState<string>('');
  const [imageIn, setImageIn] = useState<string>('');
  const [imageOut, setImageOut] = useState<string>('');
  const [res, setRes] = useState<any>();
  const [res2, setRes2] = useState<any>();

  useEffect(() => {
    const connectorGateIn = ref(database, '/gates/gate_1/card_id');
    const connectorGateOut = ref(database, '/gates/gate_2/card_id');

    onValue(connectorGateIn, (snapshot) => {
      setGateInCard(snapshot.val());
    });
    onValue(connectorGateOut, (snapshot) => {
      setGateOutCard(snapshot.val());
    });

    return () => {
      off(connectorGateIn);
      off(connectorGateOut);
    };
  }, []);
  console.log(gateInCard, gateOutCard);

  const checkin = async () => {
    setImageIn(appConfig.cam_in + '/capture');
    await set(ref(database, '/gates/gate_1/card_id'), '');
    const res = await cardApi.checkin({ cardId: gateInCard, imageUrl: appConfig.cam_in + '/capture' });
    setRes(res.data);
  };
  const checkout = async () => {
    setImageOut(appConfig.cam_out + '/capture');
    await set(ref(database, '/gates/gate_2/card_id'), '');
    const res = await cardApi.checkin({ cardId: gateInCard, imageUrl: appConfig.cam_in + '/capture' });
    setRes2(res.data);
  };

  useEffect(() => {
    if (gateInCard?.length > 0) {
      setOpen(true);
      checkin();
    }
    if (gateOutCard?.length > 0) {
      setOpen2(true);
      checkout();
    }
  }, [gateInCard, gateOutCard]);

  return (
    <main className="h-[calc(100vh_-_70px)] flex flex-row">

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Quét thẻ cổng vào thành công</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 px-4 h-full gap-2 pt-0">
            <div className="relative">
              <div className="absolute text-sm z-10 bg-secondary px-1.5 py-1 rounded-md">
                Cổng vào
              </div>
              <img
                className="h-full aspect-square rounded-md"
                src={imageIn}
                alt="imagein" />
            </div>
            <div className="col-span-2">
              <ToggleGateInButton />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open2} onOpenChange={setOpen2}>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Quét thẻ cổng ra thành công</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 px-4 h-full gap-2 pt-0">
            <div className="relative">
              <div className="absolute text-sm z-10 bg-secondary px-1.5 py-1 rounded-md">
                Cổng vào
              </div>
              <img
                className="h-full aspect-square rounded-md"
                src={res2?.imageIn}
                alt="imagein" />
            </div>
            <div className="relative">
              <div className="absolute text-sm z-10 bg-primary px-1.5 py-1 rounded-md text-primary-foreground">
                Cổng ra
              </div>
              {res?.timeOut ? (
                <img
                  className="h-full aspect-square rounded-md"
                  src={imageOut}
                  alt="imageout"
                />
              ) : (
                <div className="h-full aspect-square rounded-md flex items-center justify-center">
                  No image found
                </div>
              )}
            </div>
            <div className="col-span-2">
              <ToggleGateOutButton />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-2 w-full">
        <div className="grid grid-rows-5 h-full min-h-0">
          <div className="row-span-3 border-b">
            <CameraGroup />
          </div>
          <div className="row-span-2 p-4 lg:block hidden">
            <ActionGroup />
          </div>
        </div>
        <div className="grid ">
          <div className="border-l flex flex-col xl:border-r">
            <div className="flex-1 grid grid-rows-3">
              <div className="row-span-2">
                <HistoryGroup />
              </div>
              <div className="row-span-1 hidden xl:block">
                <StatisticGroup />
              </div>
            </div>
            <div className="row-span-2 p-4 lg:hidden border-t block">
              <ActionGroup />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default GuardViews;