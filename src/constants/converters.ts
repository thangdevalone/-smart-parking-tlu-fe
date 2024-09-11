export const ConvertColumnIDs: { [key: string]: string } = {
  'id': 'Mã',
  'cardTypeName': 'Tên thẻ',
  'cardTypePrice': 'Giá',
  'createdAt': 'Tạo lúc',
  'updatedAt': 'Sửa lúc',
};


export const KeyDialogs = {
  cardType: 'card-type',
  role: 'role',
  resetPassowrdUser: "reset-password-user",
};
export type IKeyDialog = typeof KeyDialogs[keyof typeof KeyDialogs];
