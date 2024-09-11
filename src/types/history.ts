import { Bill } from "./bill";

export interface History {
  id: number;
  imageIn: string;
  imageOut: string;
  timeIn: Date;
  timeOut: Date;
  bill: Bill;
  createdAt: Date;
  updatedAt: Date;
}
