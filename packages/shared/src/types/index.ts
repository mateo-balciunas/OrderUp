export interface Organization {
    id: string;
    name: string;
    plan: 'basic' | 'pro';
    createdAt: Date;
}

export interface Order {
    id: string;
    organizaionId: string;
    externalRef: string;
    channelId: string;
    status: OrderStatus;
    total: number;
    createdAt: Date;
}

export type OrderStatus = 
    | 'recieved'
    | 'confirmed'
    | 'delivered'
    | 'cancelled';