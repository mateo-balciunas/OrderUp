import { Request } from "express";
import { DecodedToken } from "./utils/jwt.js";

declare global {
    namespace Express {
        interface Request {
            id?: string;
            user?: DecodedToken;
        }
    }
}

declare namespace Express {
    export interface Request {
        user?: {
            userId: string;
            organizationId: string;
            role: string;
        };
    }
}