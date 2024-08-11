import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  HandCoins,
  MapPin,
  IdCard,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function SideBarList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Tổng quan',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Quản lý',
      menus: [
        {
          href: '',
          label: 'Người dùng',
          active: pathname.includes('/user'),
          icon: Users,
          submenus: [
            {
              href: '/students',
              label: 'Sinh viên',
              active: pathname === '/students',
            },
            {
              href: '/guards',
              label: 'Bảo vệ',
              active: pathname === '/guards',
            },
          ],
        },
        {
          href: '/car-park',
          label: 'Thẻ gửi xe',
          active: pathname.includes('/car-park'),
          icon: IdCard,
          submenus: [],
        },
        {
          href: '/car-park',
          label: 'Chỗ để xe',
          active: pathname.includes('/car-park'),
          icon: MapPin,
          submenus: [],
        },
        {
          href: '/categories',
          label: 'Danh mục hình ảnh',
          active: pathname.includes('/categories'),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: '/payment',
          label: 'Chi trả',
          active: pathname.includes('/payment'),
          icon: HandCoins,
          submenus: [
            {
              href: '/pay',
              label: 'Thanh toán',
              active: pathname === '/pay',
            },
            {
              href: '/bills',
              label: 'Hóa đơn',
              active: pathname === '/bills',
            },
          ],
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/account',
          label: 'Account',
          active: pathname.includes('/account'),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
