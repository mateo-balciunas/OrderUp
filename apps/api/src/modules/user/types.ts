import { MembershipResponse } from "../membership/types.ts";

//CreateUserRequest -- POST PETITION
export interface CreateUserRequest {
    email: string;
    name: string;
    password: string;
}

//UserResponse -- RESPONSE TO CreateUserRequest
export interface UserResponse {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    memberships: MembershipResponse[];
}

//UpdateUserRequest -- PUT PETITION
export interface UpdateUserRequest {
    email?: string;
    name?: string;
    password?: string;
}

//UpdateUserResponse -- RESPONSE TO UpdateUserRequest
export interface UpdateUserResponse {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    memberships: MembershipResponse[];
}

//deleteUserRequest -- DELETE PETITION
export interface DeleteUserRequest {
    id: string;
}

//GetUserResponse -- RESPONSE TO GetUserRequest
export interface GetUserResponse {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    memberships: MembershipResponse[];
}

//ListUserRequests -- GET PETITION
export interface ListUserRequests {
    page?: number;
    limit?: number;
}

//ListUserResponses -- RESPONSE TO ListUserRequests
export interface ListUserResponses {
    users: UserResponse[];
    total: number;
    page: number;
    limit: number;
} 
