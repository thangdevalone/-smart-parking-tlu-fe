import { Button } from '@/components/ui/button.tsx';
import { paymentsApi } from '@/api/payments.ts';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Payment = () => {
  const location = useLocation();

  const getQueryParams = (search: string) => {
    const params = new URLSearchParams(search);
    return {
      statusPayment: params.get('statusPayment'),
    };
  };

  const { statusPayment } = getQueryParams(location.search);

  useEffect(() => {
    if (statusPayment) {
      if (statusPayment === '00') toast.success('Gia hạn thành công');
      if (statusPayment === '04') toast.error('Gia hạn không thành công');
    }
  }, []);

  const handleCreatePaymentVNP = async () => {
    try {
      const result = await paymentsApi.createPaymentVNP();
      if (result.data.data) window.location.href = result.data.data;
    } catch (error) {
    }
  };



  return (
    <div className="p-10">
      <Button onClick={() => handleCreatePaymentVNP()}>Thanh toán VNPAY</Button>
    </div>
  );
};
