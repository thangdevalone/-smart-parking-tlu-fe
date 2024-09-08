import { Bookmark, HandCoins, IdCard, LayoutGrid, LucideIcon, MapPin, Settings, Users } from 'lucide-react';
import { RoleInApp } from '@/types';

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

export function SideBarList(pathname: string, role: Exclude<RoleInApp, RoleInApp.GUARD>): Group[] {
  console.log(pathname);
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: `/${role}/dashboard`,
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
          label: 'Hệ thống',
          active: pathname.includes('/user') || pathname.includes('/roles'),
          icon: Users,
          submenus: [
            {
              href: `/${role}/user`,
              label: 'Người dùng',
              active: pathname.includes(`/${role}/user`),
            },
            {
              href: `/${role}/roles`,
              label: 'Vai trò',
              active: pathname === `/${role}/roles`,
            },
          ],
        },
        {
          href: ``,
          label: 'Thẻ gửi xe',
          active: pathname.includes('/card-type') || pathname.includes('/card'),
          icon: IdCard,
          submenus: [
            {
              href: `/${role}/card`,
              label: 'Thẻ cứng',
              active: pathname === `/${role}/card`,
            },
            {
              href: `/${role}/card-type`,
              label: 'Loại thẻ',
              active: pathname === `/${role}/card-type`,
            },
          ],
        },
        {
          href: `/${role}/car-park`,
          label: 'Chỗ để xe',
          active: pathname.includes('/car-park'),
          icon: MapPin,
          submenus: [],
        },
        {
          href: `/${role}/categories`,
          label: 'Danh mục hình ảnh',
          active: pathname.includes('/categories'),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: `/${role}/payment`,
          label: 'Chi trả',
          active: pathname.includes('/payment'),
          icon: HandCoins,
          submenus: [
            {
              href: `/${role}/payment/pay`,
              label: 'Thanh toán',
              active: pathname === `/${role}/payment/pay`,
            },
            {
              href: `/${role}/payment/bills`,
              label: 'Hóa đơn',
              active: pathname === `/${role}/payment/bills`,
            },
          ],
        },
      ],
    },
    {
      groupLabel: 'Cấu hình',
      menus: [
        {
          href: `/${role}/settings`,
          label: 'Cài đặt',
          active: pathname.includes(`/${role}/settings`),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
