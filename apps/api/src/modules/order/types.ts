import type { Decimal, JsonValue} from '@orderup/db';


//CreateOrderRequest -- POST PETITION
export interface CreateOrderRequest {
    organizationId: string;
    externalRef: string;
    channelId: string;
    status: string;
    metadata: JsonValue;
    priority: number;
    lines: OrderLineRequest[];
}

//OrderResponse -- RESPONSE TO CreateOrderRequest
export interface OrderResponse {
    id: string;
    organizationId: string;
    externalRef: string;
    channelId: string;
    status: string;
    total: Decimal;
    priority: number;
    metadata: JsonValue;
    createdAt: Date;
    updatedAt: Date;
}

//UpdateOrderStatusRequest -- PUT PETITION
export interface UpdateOrderStatusRequest {
    status: string;
    reason: string;
    userId?: string;
}

//UpdateOrderStatusResponse -- RESPONSE TO UpdateOrderStatusRequest
export interface UpdateOrderStatusResponse {
    id: string;
    organizationId: string;
    externalRef: string;
    channelId: string;
    status: string;
    total: Decimal;
    priority: number;
    metadata: JsonValue;
    updatedAt: Date;
    lines: OrderLineResponse[];
}

//DeleteOrderRequest -- DELETE PETITION
export interface DeleteOrderRequest {
    id: string;
    reason?: string;
}

//DeleteOrderResponse -- RESPONSE TO DeleteOrderRequest
export interface DeleteOrderResponse {
    id: string;
    organizationId: string;
}


//GetOrderResponse -- RESPONSE TO GetOrderRequest
export interface GetOrderResponse {
    id: string;
    organizationId: string;
    externalRef: string;
    channelId: string;
    status: string;
    total: Decimal;
    priority: number;
    metadata: JsonValue;
    createdAt: Date;
    updatedAt: Date;
    lines: OrderLineResponse[];
}

//ListtOrderRequests -- GET PETITION
export interface ListOrderRequests {
    organizationId: string;
}

//ListOrdersReponse -- Response to ListOrderRequests
export interface ListOrdersResponse {
    orders: OrderResponse[];
    total: number;
    page: number;
    limit: number;
}


//OrderLineRequest -- POST PETITION
export interface OrderLineRequest {
    sku: string;
    quantity: number;
    unit?: string;
    unitPrice: number;
}

export interface OrderLineResponse {
    id: string;
    sku: string;
    quantity: Decimal;
    unit?: string;
    unitPrice: Decimal;
    total: Decimal; //quantity * unitPrice
    
}

export type OrderStatus = 'recieved' | 'confirmed' | 'cancelled'; 

