import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    create(data: any, username: string): Promise<{
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
    update(id: string, data: any, username: string, role: string): Promise<{
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
    remove(id: string, username: string, role: string): Promise<{
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
