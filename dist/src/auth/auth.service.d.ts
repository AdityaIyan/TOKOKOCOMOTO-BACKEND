import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            username: any;
            email: any;
            role: any;
            avatar: any;
        };
    }>;
    login(data: any): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            username: any;
            email: any;
            role: any;
            avatar: any;
        };
    }>;
    refresh(data: any): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            username: any;
            email: any;
            role: any;
            avatar: any;
        };
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    updateProfile(userId: string, data: {
        username?: string;
        email?: string;
        avatar?: string;
    }): Promise<{
        message: string;
        user: {
            id: string;
            username: string;
            email: string;
            role: string;
            avatar: string | null;
        };
    }>;
    private generateTokens;
}
