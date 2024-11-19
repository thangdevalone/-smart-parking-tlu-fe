export const ConvertColumnIDs: { [key: string]: string } = {
  'id': 'Mã',
  'cardTypeName': 'Loại thẻ',
  'cardTypePrice': 'Giá',
  'createdAt': 'Tạo lúc',
  'updatedAt': 'Sửa lúc',
  'cardCode': 'Tên thẻ',
  'status': 'Trạng thái',
  'startDate': 'Thời gian vào',
  'endDate': 'Thời gian ra',
  'price': 'Giá tiền',
  'idCard': 'Mã định danh thẻ',
  'imageIn': 'Ảnh vào',
  'imageOut': 'Ảnh ra',
  'ticketType': 'Loại vé',
};


export class ColorConfig {
  static config = {
    draft: 'hsl(var(--background))',
    'draft-foreground': 'hsl(var(--foreground))',
    active: 'hsl(var(--active))',
    'active-foreground': 'hsl(var(--primary-foreground))',
    pending: 'hsl(var(--inactive))',
    'pending-foreground': 'hsl(var(--primary-foreground))',
    rejected: 'hsl(var(--accent))',
    'rejected-foreground': 'hsl(var(--muted-foreground))',
  } as const;

  public static getStatusColor(status: keyof typeof ColorConfig.config) {
    const background = ColorConfig.config[status] || 'transparent';
    const foreground = ColorConfig.config[`${status}-foreground` as keyof typeof ColorConfig.config];
    return { background, foreground };
  }
}

export type ColorConfigKey = keyof typeof ColorConfig.config;


export const KeyDialogs = {
  cardType: 'card-type',
  card: 'card',
  role: 'role',
  resetPassowrdUser: 'reset-password-user',
  paymentVNpay: 'paymentvnpay',
};
export type IKeyDialog = typeof KeyDialogs[keyof typeof KeyDialogs];
