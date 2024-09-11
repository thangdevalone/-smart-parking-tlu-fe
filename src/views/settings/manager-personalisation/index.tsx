import { useTheme } from "@/components/providers/theme-provider";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const ManagerPersonalisation = () => {
  const { setTheme, theme } = useTheme()

  const handleChangeTheme = (value: any) => {
    localStorage.setItem('theme', value);
    setTheme(value)
  }
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Theme
      </span>
      <p className="text-[0.8rem] text-muted-foreground">Chọn màu chủ đề cho trang chủ</p>
      <RadioGroup defaultValue={theme || "light"} value={theme} onValueChange={handleChangeTheme}>
        <div className="grid grid-cols-2 w-fit mt-5 gap-3">
          <div onClick={() => handleChangeTheme('light')} className="border rounded-md overflow-hidden cursor-pointer">
            <img
              className="border-b"
              src="/assets/light_theme.svg"
              alt="light_theme"
            />
            <div className="flex py-2 px-2 flex-row items-center justify-between">
              <p className="font-semibold">Light theme</p>
              <RadioGroupItem value="light" id="light" />
            </div>
          </div>
          <div onClick={() => handleChangeTheme('dark')} className="border rounded-md overflow-hidden cursor-pointer">
            <img src="/assets/dark_theme.svg" alt="light_theme" />
            <div className="flex py-2 px-2 flex-row items-center justify-between">
              <p className="font-semibold">Dark theme</p>
              <RadioGroupItem value="dark" id="dark" />
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}