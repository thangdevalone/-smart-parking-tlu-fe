import { Separator } from '@/components/ui/separator.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { ToggleGateInButton, ToggleGateOutButton } from '@/views/guards/components/action.tsx';
import { useActionGroupStore } from '@/store/withAi-store.ts';


export default function ActionGroup() {
  const { withAi, toggleWithAi } = useActionGroupStore();

  return (
    <div className="flex lg:flex-row flex-col lg:gap-8 gap-2 lg:h-full">
      <div className="space-y-3">
        <p className="text-lg font-semibold">Hành động</p>
        <div className="xl:gap-4 gap-2 flex flex-wrap xl:flex-nowrap">
          <ToggleGateInButton />
          <ToggleGateOutButton />
        </div>
      </div>
      <Separator orientation="vertical" className="lg:block hidden" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Công cụ</p>
        <div className="items-top flex space-x-2">
          <Checkbox checked={withAi}
                    onCheckedChange={toggleWithAi} id="terms1" />
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
      </div>
    </div>
  );
}
