import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
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
    login(body: any): Promise<{
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
    refresh(body: any): Promise<{
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
    logout(req: any): Promise<{
        message: string;
    }>;
    updateProfile(req: any, body: any, file: Express.Multer.File): Promise<{
        message: string;
        user: {
            id: string;
            username: string;
            email: string;
            role: string;
            avatar: string | null;
        };
    }>;
}
