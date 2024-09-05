import { useTheme } from '@/components/providers/theme-provider';

export const LogoCollapse = () => {
  const { theme } = useTheme();
  return (
    <svg
      className='mr-2'
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40"
      zoomAndPan="magnify"
      viewBox="0 0 30 30.000001"
      height="40"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="236fe374ac">
          <path
            d="M 0.484375 0 L 29.515625 0 L 29.515625 29.03125 L 0.484375 29.03125 Z M 0.484375 0 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="cb856e38ad">
          <path d="M 3 6 L 11 6 L 11 27 L 3 27 Z M 3 6 " clipRule="nonzero" />
        </clipPath>
        <clipPath id="20ba1b2d50">
          <path
            d="M 2.71875 0.867188 L 26.667969 0.910156 L 26.621094 27.765625 L 2.671875 27.722656 Z M 2.71875 0.867188 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="42d55de922">
          <path
            d="M 2.71875 0.867188 L 101.425781 1.039062 L 101.378906 29.347656 L 2.667969 29.175781 Z M 2.71875 0.867188 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="556edebdf4">
          <path
            d="M 3.050781 0.945312 L 101.09375 1.117188 L 101.042969 29.210938 L 3.003906 29.039062 Z M 3.050781 0.945312 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="098b170fdd">
          <path
            d="M 12 0.914062 L 25 0.914062 L 25 27 L 12 27 Z M 12 0.914062 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="d597cee353">
          <path
            d="M 2.71875 0.867188 L 26.667969 0.910156 L 26.621094 27.765625 L 2.671875 27.722656 Z M 2.71875 0.867188 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="e94bf2091a">
          <path
            d="M 2.71875 0.867188 L 101.425781 1.039062 L 101.378906 29.347656 L 2.667969 29.175781 Z M 2.71875 0.867188 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="a7f8f55f6a">
          <path
            d="M 3.050781 0.945312 L 101.09375 1.117188 L 101.042969 29.210938 L 3.003906 29.039062 Z M 3.050781 0.945312 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#cb856e38ad)">
        <g clipPath="url(#20ba1b2d50)">
          <g clipPath="url(#42d55de922)">
            <g clipPath="url(#556edebdf4)">
              <path
                fill={theme == 'light' ? '#050C56' : 'white'}
                d="M 3.042969 6.074219 L 3.042969 6.636719 L 8.164062 8.191406 L 8.132812 26.441406 L 10.871094 26.445312 L 10.90625 6.085938 Z M 3.042969 6.074219 "
                fillOpacity="1"
                fillRule="nonzero"
              />
            </g>
          </g>
        </g>
      </g>
      <g clipPath="url(#098b170fdd)">
        <g clipPath="url(#d597cee353)">
          <g clipPath="url(#e94bf2091a)">
            <g clipPath="url(#a7f8f55f6a)">
              <path
                fill="#f32409"
                d="M 22.777344 1.25 C 22.945312 1.015625 22.71875 0.867188 22.519531 1.105469 C 19.542969 4.589844 13.574219 12.347656 12.277344 19.140625 C 11.976562 20.710938 11.894531 22.167969 12.214844 23.625 C 12.535156 25.082031 13.59375 26.640625 15.796875 26.714844 C 19.515625 26.84375 22.539062 22.503906 24.839844 16.285156 C 24.882812 16.171875 24.738281 16.09375 24.683594 16.207031 C 22.148438 21.53125 18.121094 25 15.96875 23.957031 C 12.417969 22.234375 16.628906 10.25 22.777344 1.261719 Z M 22.777344 1.25 "
                fillOpacity="1"
                fillRule="evenodd"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
