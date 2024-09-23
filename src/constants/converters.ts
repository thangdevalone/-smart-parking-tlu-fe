export const ConvertColumnIDs: { [key: string]: string } = {
  'id': 'Mã',
  'cardTypeName': 'Loại thẻ',
  'cardTypePrice': 'Giá',
  'createdAt': 'Tạo lúc',
  'updatedAt': 'Sửa lúc',
  'cardCode': 'Tên thẻ',
  'Status': 'Trạng thái',
  'startDate' : 'Thời gian vào',
  'endDate' : 'Thời gian ra',
  'price': 'Giá tiền',
  'imageIn': 'Ảnh vào',
  'imageOut': 'Ảnh ra',
  'ticketType': 'Loại vé',
};


export const KeyDialogs = {
  cardType: 'card-type',
  card: 'card',
  role: 'role',
  resetPassowrdUser: "reset-password-user",
};
export type IKeyDialog = typeof KeyDialogs[keyof typeof KeyDialogs];
