

//CreateChannelConnectionRequest -- POST PETITION
export interface CreateChannelConnectionRequest {
    organizationId: string;
    channelType: string;
    name: string;
    config: JSON;
    isActive: boolean;
}

//ChannelConnectionResponse -- RESPONSE TO CreateChannelConnectionRequest
export interface ChannelConnectionResponse {
    id: string;
    organizationId: string;
    channelType: string;
    name: string;
    config: JSON;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

//UpdateChannelConnectionRequest -- PUT PETITION
export interface UpdateChannelConnectionRequest {
    channelType?: string;
    name?: string;
    config?: JSON;
    isActive?: boolean;
}

//UpdateChannelConnectionResponse -- RESPONSE TO UpdateChannelConnectionRequest
export interface UpdateChannelConnectionResponse {
    id: string;
    organizationId: string;
    channelType: string;
    name: string;
    config: JSON;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

//DeleteChannelConnectionResponse -- RESPONSE TO DeleteChannelConnectionRequest
export interface DeleteChannelConnectionResponse {
    id: string;
}

//GetChannelConnectionResponse -- RESPONSE TO GetChannelConnectionRequest
export interface GetChannelConnectionResponse {
    id: string;
    organizationId: string;
    channelType: string;
    name: string;
    config: JSON;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

//ListChannelConnectionsRequest -- GET PETITION
export interface ListChannelConnectionsRequest {
    page?: number;
    limit?: number;
}

//ListChannelConnectionsResponse -- RESPONSE TO ListChannelConnectionsRequest
export interface ListChannelConnectionsResponse {
    channelConnections: ChannelConnectionResponse[];
    total: number;
    page: number;
    limit: number;
}