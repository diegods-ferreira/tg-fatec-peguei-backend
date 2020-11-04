import { Request, Response } from 'express';
import UpdateOrderPurchaseInvoiceService from '@modules/orders/services/UpdateOrderPurchaseInvoiceService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class OrderPurchaseInvoiceController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateOrderPurchaseInvoice = container.resolve(
      UpdateOrderPurchaseInvoiceService,
    );

    const order = await updateOrderPurchaseInvoice.execute({
      order_id: request.body.order_id,
      purchase_invoice: request.file.filename,
      user_id: request.user.id,
    });

    return response.json(classToClass(order));
  }
}
