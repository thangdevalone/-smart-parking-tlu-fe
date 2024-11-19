import { appConfig } from '@/configs';

export default function CameraGroup() {
  return (
    <div className="grid xl:grid-cols-2 grid-rows-2 w-full">
      <img
        className="border-[red] border"
        src={appConfig.cam_in + ':81/stream'}
        alt="img" />
      <img
        className="border-[red] border"
        src={appConfig.cam_out + ':81/stream'}

        alt="img" />
    </div>
  );
}