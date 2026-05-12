import { PrismaService } from '../prisma/prisma.service';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        author: {
            username: string;
        };
        replies: ({
            author: {
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            content: string;
            authorId: string;
            parentId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        content: string;
        authorId: string;
        parentId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        author: {
            username: string;
        };
        replies: ({
            author: {
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            content: string;
            authorId: string;
            parentId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        content: string;
        authorId: string;
        parentId: string | null;
    }>;
    create(data: any, authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        content: string;
        authorId: string;
        parentId: string | null;
    }>;
    reply(parentId: string, data: any, authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        content: string;
        authorId: string;
        parentId: string | null;
    }>;
}
