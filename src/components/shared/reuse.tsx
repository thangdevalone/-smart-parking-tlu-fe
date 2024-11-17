import { ColorConfig, ColorConfigKey } from '@/constants';
import { Badge } from '@/components/ui/badge.tsx';

export const renderStatus = (status: ColorConfigKey) => {
  const { background, foreground } = ColorConfig.getStatusColor(status);
  return (
    <Badge variant="outline" className="capitalize h-[24px] border-border" style={{ background, color: foreground }}>
      {status}
    </Badge>
  );
};