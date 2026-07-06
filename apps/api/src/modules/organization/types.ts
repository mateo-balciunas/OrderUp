import { MembershipResponse } from "../membership/types.ts";
import { OrderResponse } from "../order/types.ts";

//CreateOrganzationRequest -- POST PETITION
export interface CreateOrganizationRequest {
    name: string;
    plan: 'basic' | 'pro';
}

//CreateOrganizationResponse -- RESPONSE TO CreateOrganizationRequest
export interface OrganizationResponse {
    id: string;
    name: string;
    plan: 'basic' | 'pro';
    createdAt: Date;
    updatedAt: Date;
    users: MembershipResponse[];
    orders: OrderResponse[];
}

//UpdateOrganizationRequest -- PUT PETITION
export interface UpdateOrganizationRequest {
    name?: string;
    plan?: 'basic' | 'pro';
}

//UpdateOrganizationResponse -- RESPONSE TO UpdateOrganizationRequest
export interface UpdateOrganizationResponse {
    id: string;
    name: string;
    plan: 'basic' | 'pro';
    createdAt: Date;
    updatedAt: Date;
    users: MembershipResponse[];
    orders: OrderResponse[];
}


//DeleteOrganizationResponse -- RESPONSE TO DeleteOrganizationRequest
export interface DeleteOrganizationResponse {
    id: string;
    name: string;
}


//GetOrganizationResponse -- RESPONSE TO GetOrganizationRequest
export interface GetOrganizationResponse {
    id: string;
    name: string;
    plan: 'basic' | 'pro';
    createdAt: Date;
    updatedAt: Date;
    users: MembershipResponse[];
    orders: OrderResponse[];
}

//ListOrganizationsRequest -- GET PETITION
export interface ListOrganizationsRequest {
    page?: number;
    limit?: number;
}

//ListOrganizationsResponse -- RESPONSE TO ListOrganizationsRequest
export interface ListOrganizationsResponse {
    organizations: OrganizationResponse[];
    total: number;
    page: number;
    limit: number;
}