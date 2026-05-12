import { PrismaService } from '../prisma/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId: string): Promise<{
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
            cartId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    addToCart(userId: string, productId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cartId: string;
        productId: string;
        quantity: number;
    }>;
    updateItem(cartItemId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cartId: string;
        productId: string;
        quantity: number;
    }>;
    removeItem(cartItemId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cartId: string;
        productId: string;
        quantity: number;
    }>;
}
