

//CreateMembershipRequest -- POST PETITION
export interface CreateMembershipRequest {
    userId: string;
    organizationId: string;
    role: 'admin' | 'operator';
}

//MembershipResponse -- RESPONSE TO CreateMembershipRequest
export interface MembershipResponse {
    id: string;
    userId: string;
    organizationId: string;
    role: 'admin' | 'operator';
    createdAt: Date;
    updatedAt: Date;
}

//UpdateMembershipRequest -- PUT PETITION
export interface UpdateMembershipRequest {
    role?: 'admin' | 'operator';
}

//UpdateMembershipResponse -- RESPONSE TO UpdateMembershipRequest
export interface UpdateMembershipResponse {
    id: string;
    userId: string;
    organizationId: string;
    role: 'admin' | 'operator';
    createdAt: Date;
    updatedAt: Date;
}

//DeleteMembershipResponse -- RESPONSE TO DeleteMembershipRequest
export interface DeleteMembershipResponse {
    id: string;
}

//GetMembershipResponse -- RESPONSE TO GetMembershipRequest
export interface GetMembershipRequest {
    id: string;
}

//GetMembershipResponse -- RESPONSE TO GetMembershipRequest
export interface GetMembershipResponse {
    id: string;
    userId: string;
    organizationId: string;
    role: 'admin' | 'operator';
    createdAt: Date;
    updatedAt: Date;
}

//ListMembershipsRequest -- GET PETITION
export interface ListMembershipsRequest {
    page?: number;
    limit?: number;
}

//ListMembershipsResponse -- RESPONSE TO ListMembershipsRequest
export interface ListMembershipsResponse {
    memberships: MembershipResponse[];
    total: number;
    page: number;
    limit: number;
}

export type MembershipRole = 'admin' | 'operator';