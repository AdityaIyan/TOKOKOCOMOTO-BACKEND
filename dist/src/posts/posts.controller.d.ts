import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
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
    create(body: any, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        content: string;
        authorId: string;
        parentId: string | null;
    }>;
    reply(id: string, body: any, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        content: string;
        authorId: string;
        parentId: string | null;
    }>;
}
