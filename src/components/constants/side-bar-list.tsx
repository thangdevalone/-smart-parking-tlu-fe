import {
  Bookmark,
  HandCoins,
  IdCard,
  LayoutGrid,
  LucideIcon,
  MapPin,
  Settings,
  Users,
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
          href: '/admin/dashboard',
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
              href: '/admin/students',
              label: 'Sinh viên',
              active: pathname === '/students',
            },
            {
              href: '/admin/guards',
              label: 'Bảo vệ',
              active: pathname === '/guards',
            },
          ],
        },
        {
          href: '/admin/car-card',
          label: 'Thẻ gửi xe',
          active: pathname.includes('/car-card'),
          icon: IdCard,
          submenus: [],
        },
        {
          href: '/admin/car-park',
          label: 'Chỗ để xe',
          active: pathname.includes('/car-park'),
          icon: MapPin,
          submenus: [],
        },
        {
          href: '/admin/categories',
          label: 'Danh mục hình ảnh',
          active: pathname.includes('/categories'),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: '/admin/payment',
          label: 'Chi trả',
          active: pathname.includes('/payment'),
          icon: HandCoins,
          submenus: [
            {
              href: '/admin/payment/pay',
              label: 'Thanh toán',
              active: pathname === '/pay',
            },
            {
              href: '/admin/payment/bills',
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
          href: '/admin/account',
          label: 'Account',
          active: pathname.includes('/admin/account'),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
