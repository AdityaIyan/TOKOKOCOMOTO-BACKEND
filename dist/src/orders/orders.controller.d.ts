import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(body: any, req: any): Promise<{
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                sku: string | null;
                category: string | null;
                gender: string | null;
                images: string;
                sellerId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
        buyer: {
            username: string;
            email: string;
            password: string;
            role: string;
            id: string;
            refreshToken: string | null;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        totalAmount: number;
        shippingAddress: string | null;
        paymentMethod: string | null;
        paymentProof: string | null;
        buyerId: string;
    }>;
    findAll(req: any): Promise<{
        data: any;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        items: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                price: number;
                stock: number;
                sku: string | null;
                category: string | null;
                gender: string | null;
                images: string;
                sellerId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
        buyer: {
            username: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        totalAmount: number;
        shippingAddress: string | null;
        paymentMethod: string | null;
        paymentProof: string | null;
        buyerId: string;
    }>;
    updateStatus(id: string, status: string): Promise<{
        buyer: {
            username: string;
            email: string;
            password: string;
            role: string;
            id: string;
            refreshToken: string | null;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        totalAmount: number;
        shippingAddress: string | null;
        paymentMethod: string | null;
        paymentProof: string | null;
        buyerId: string;
    }>;
    payOrder(id: string, paymentMethod: string, file: Express.Multer.File, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        totalAmount: number;
        shippingAddress: string | null;
        paymentMethod: string | null;
        paymentProof: string | null;
        buyerId: string;
    }>;
}
