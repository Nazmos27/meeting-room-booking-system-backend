import { verifyPayment } from '../../utils/payment';
import { BookingModel } from '../booking/booking.model';

const confirmationService = async (txnId: string) => {
  const verifyPaymentResponse = await verifyPayment(txnId);

  let result;
  if (
    verifyPaymentResponse &&
    verifyPaymentResponse.pay_status === 'Successful'
  ) {
    result = await BookingModel.findOneAndUpdate(
      { txnId },
      {
        paymentStatus: 'Paid',
      },
    )
      .populate('room')
      .populate('user')
      .populate('slots');
  }
  return result;
};

export const paymentServices = {
  confirmationService,
};  