import axios from 'axios';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { TPaymentData } from '../modules/booking/booking.interface';

export const initiatePayment = async (paymentData: TPaymentData) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/payment/confirmation?txnId=${paymentData.transactionId}&status=success`,
      fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
      cancel_url: 'https://reserve-it-ten.vercel.app/',
      amount: paymentData.totalAmount,
      currency: 'BDT',
      desc: 'Room Booking Payment',
      cus_name: paymentData.user.name,
      cus_email: paymentData.user.email,
      cus_add1: paymentData.user.address,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: paymentData.user.phone,
      type: 'json',
    });
    return response;
  } catch (error) {
    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      'Payment initiation Failed',
    );
  }
};

export const verifyPayment = async (txnId: string) => {
  try {
    const response = await axios.get(config.payment_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
        request_id: txnId,
      },
    });
    return response.data;
  } catch (error) {
    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      'Payment Verification Failed',
    );
  }
};
