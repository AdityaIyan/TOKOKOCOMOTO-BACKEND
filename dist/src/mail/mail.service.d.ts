export declare class MailService {
    private transporter;
    constructor();
    sendOrderStatusEmail(to: string, orderId: string, status: string): Promise<void>;
}
