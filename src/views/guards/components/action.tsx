import { Button } from '@/components/ui/button.tsx';
import { LogIn, LogOut } from 'lucide-react';
import { database } from '@/firebase.ts';
import { off, onValue, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Gate {
  status: boolean;
  obstacle: boolean;
  card_id: string;
}

export function ToggleGateInButton() {
  const [gateIn, setGateIn] = useState<Gate | undefined>();

  useEffect(() => {
    const connectorGateIn = ref(database, '/gates/gate_1');

    onValue(connectorGateIn, (snapshot) => {
      setGateIn(snapshot.val());
    });

    return () => {
      off(connectorGateIn);
    };
  }, []);

  const toggleGateIn = async () => {
    if (gateIn !== undefined) {
      if (gateIn.obstacle && gateIn.status) {
        toast.error('Cổng vào không thể đóng vì có vật cản!');
        return;
      }

      const newStatus = !gateIn.status;
      try {
        await set(ref(database, '/gates/gate_1/status'), newStatus);
        setGateIn({ ...gateIn, status: newStatus });
        toast.success('Thao tác với cổng thành công!');
      } catch (error) {
        toast.error('Error updating gateIn status:' + error);
      }
    }
  };

  return (
    <Button
      onClick={toggleGateIn}
      className="h-16 px-8 w-[200px] text-base bg-default-red hover:bg-default-red hover:opacity-90"
      icon={<LogIn className="w-4 h-4 mr-2" />}
    >
      {gateIn?.status ? 'Đóng cổng vào' : 'Mở cổng vào'}
    </Button>
  );
}


export function ToggleGateOutButton() {
  const [gateOut, setGateOut] = useState<Gate | undefined>();

  useEffect(() => {
    const connectorGateOut = ref(database, '/gates/gate_2');

    onValue(connectorGateOut, (snapshot) => {
      setGateOut(snapshot.val());
    });

    return () => {
      off(connectorGateOut);
    };
  }, []);

  const toggleGateOut = async () => {
    if (gateOut !== undefined) {
      if (gateOut.obstacle && gateOut.status) {
        toast.error('Cổng ra không thể đóng vì có vật cản!');
        return;
      }

      const newStatus = !gateOut.status;
      try {
        await set(ref(database, '/gates/gate_2/status'), newStatus);
        setGateOut({ ...gateOut, status: newStatus });
        toast.success('Thao tác với cổng thành công!');
      } catch (error) {
        toast.error('Error updating gateOut status:' + error);
      }
    }
  };

  return (
    <Button
      onClick={toggleGateOut}
      className="h-16 px-8  w-[200px] text-base bg-default-blue hover:bg-default-blue hover:opacity-90"
      icon={<LogOut className="w-4 h-4 mr-2" />}
    >
      {gateOut?.status ? 'Đóng cổng ra' : 'Mở cổng ra'}
    </Button>
  );
}