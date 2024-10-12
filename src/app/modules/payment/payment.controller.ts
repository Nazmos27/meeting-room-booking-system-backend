import { Request, Response } from 'express';
import { paymentServices } from './payment.service';
import { messageTemplate } from './messageTemplate';

const confirmationController = async (req: Request, res: Response) => {
  const { status, txnId } = req.query;
  console.log("status",status);
  await paymentServices.confirmationService(txnId as string);
    
  const generateTemplate = messageTemplate(status as string);

  res.send(generateTemplate);
};

export const paymentController = {
  confirmationController,
};