import { Button } from '@/components/ui/button.tsx';
import { LogIn, LogOut } from 'lucide-react';
import { database } from '@/firebase.ts';
import { ref, onValue, off, set } from 'firebase/database';
import { useEffect, useState } from 'react';

export function ToggleGateInButton() {
  const [gateIn, setGateIn] = useState<boolean>();

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
      const newStatus = !gateIn;
      try {
        await set(ref(database, '/gates/gate_1'), newStatus);
        setGateIn(newStatus);
      } catch (error) {
        console.error('Error updating gateIn status:', error);
      }
    }
  };

  return (
    <Button
      onClick={toggleGateIn}
      className="h-16 px-8 w-full text-base bg-default-red hover:bg-default-red hover:opacity-90"
      icon={<LogIn className="w-4 h-4 mr-2" />}
    >
      {gateIn ? 'Đóng cổng vào' : 'Mở cổng vào'}
    </Button>
  );
}


export function ToggleGateOutButton() {
  const [gateOut, setGateOut] = useState<boolean>();

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
      const newStatus = !gateOut;
      try {
        await set(ref(database, '/gates/gate_2'), newStatus);
        setGateOut(newStatus);
      } catch (error) {
        console.error('Error updating gateOut status:', error);
      }
    }
  };

  return (
    <Button
      onClick={toggleGateOut}
      className="h-16 px-8 w-full text-base bg-default-blue hover:bg-default-blue hover:opacity-90"
      icon={<LogOut className="w-4 h-4 mr-2" />}
    >
      {gateOut ? 'Đóng cổng ra' : 'Mở cổng ra'}
    </Button>
  );
}


