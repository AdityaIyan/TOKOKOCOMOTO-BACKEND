import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<({
        seller: {
            username: string;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        seller: {
            username: string;
        };
    } & {
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
    }>;
    create(body: any, req: any, file: Express.Multer.File): Promise<{
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
    }>;
    update(id: string, body: any, req: any, file: Express.Multer.File): Promise<{
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
    }>;
    remove(id: string, req: any): Promise<{
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
    }>;
}
