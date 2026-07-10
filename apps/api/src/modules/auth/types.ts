import { prisma } from '@orderup/db';

//LOGIN REQUEST
export interface LoginRequest {
    email: string;
    password: string;
}

//LOGIN RESPONSE
export interface LoginResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    }
}

//CURRENT USER REQUEST
export interface CurrentUserRequest {
    accessToken: string;
}

//CURRENT USER RESPONSE
export interface CurrentUserResponse {
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
        organizationId: string;
    }
}

//REGISTER USER REQUEST
export interface RegisterUserRequest {
    email: string;
    name: string;
    password: string;
}

//REGISTER USER RESPONSE
export interface RegisterUserResponse {
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    accessToken: string;
}