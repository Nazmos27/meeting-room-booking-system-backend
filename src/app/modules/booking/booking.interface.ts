import { Types } from 'mongoose';
import { TUser } from '../user/user.interface';

export type TBooking = {
  date: string;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  user: Types.ObjectId;
  email : string,
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid';
  tnxId?: string;
  totalAmount?: number;
  isConfirmed?: 'confirmed' | 'unconfirmed';
  isDeleted?: boolean;
};

export type TPaymentData = {
  date: string;
  slots: string[];
  room: string;
  user: TUser;
  email: string;
  transactionId: string;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid';
  totalAmount: number;
  isConfirmed: 'unconfirmed' | 'confirmed';
  isDeleted: boolean;
};