
import { Separator } from '@/components/ui/separator.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ToggleGateInButton, ToggleGateOutButton } from '@/views/guards/components/action.tsx';


export default function ActionGroup() {
  return (
    <div className="flex lg:flex-row flex-col lg:gap-8 gap-2 lg:h-full">
      <div className="space-y-3">
        <p className="text-lg font-semibold">Hành động</p>
        <div className="xl:gap-4 gap-2 flex flex-wrap xl:flex-nowrap">
          <ToggleGateInButton />
          <ToggleGateOutButton />
        </div>
        <div className="flex-col lg:flex hidden">
          <p><span className="font-medium">Tổng số xe hiện có:</span> 100 xe</p>
          <p><span className="font-medium">Tổng số xe có thể chứa:</span> 200 xe</p>
        </div>
      </div>
      <Separator orientation="vertical" className="lg:block hidden" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Công cụ</p>
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium xl:leading-none leading-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Phân tích biển số với AI (Thử nghiệm)
            </label>
            <p className="text-sm text-muted-foreground xl:block hidden">
              Tự động đọc và phát hiện lọc ra biển số xe qua hình ảnh
            </p>
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox id="terms2" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms2"
              className="text-sm font-medium xl:leading-none leading-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Cảnh báo đầy bãi đỗ xe
            </label>
            <p className="text-sm text-muted-foreground xl:block hidden">
              Bãi đỗ xe sắp đầy bạn sẽ nhận được thông báo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
