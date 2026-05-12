import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
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
    addToCart(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cartId: string;
        productId: string;
        quantity: number;
    }>;
    updateItem(id: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cartId: string;
        productId: string;
        quantity: number;
    }>;
    removeItem(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cartId: string;
        productId: string;
        quantity: number;
    }>;
}
