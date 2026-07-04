import { Request, Response, NextFunction } from "express";
import { MembershipService } from "../services/MembershipService.js";

const membershipService = new MembershipService();

export class MembershipController {

    //POST /api/v1/memberships
    async createMembership( req: Request, res: Response, next: NextFunction ){
        try {
            const { userId, organizationId, role } = req.body;
            if( !userId || !organizationId || !role ){
                return res.status(400).json({ message: 'User ID, organization ID and role are required', status: 'error' });
            }

            const membership = await membershipService.createMembership( userId as string, organizationId as string, role);
            return res.status(201).json( membership );
        } catch( error ){
            return next( error );
        }
    }
    
    //GET /api/v1/memberships/:membershipId
    async getMembership( req: Request, res: Response, next: NextFunction) {
        try {
            const { membershipId } = req.params;
            if( !membershipId ){
                return res.status(400).json({ message: 'Membership ID is required', status: 'error' });
            }

            const membership = await membershipService.getMembership( membershipId as string );
            return res.status(200).json( membership );
        } catch( error ){
            return next( error );
        }
    }

    //GET /api/v1/memberships
    async listMemberships( req: Request, res: Response, next: NextFunction ){
        try {
            const { userId, organizationId } = req.query;

            const memberships = await membershipService.listMemberships({ 
                userId: userId as string || undefined,
                organizationId: organizationId as string || undefined
            });
            return res.status(200).json( memberships );
        } catch( error ){
            return next( error );
        }
    }

    //PUT /api/v1/memberships/:membershipId
    async updateMembership( req: Request, res: Response, next: NextFunction ){
        try {
            const { membershipId } = req.params;
            if( !membershipId ){
                return res.status(400).json({ message: 'Membership ID is required', status: 'error' });
            }
            const { role } = req.body;
            if( !role ){
                return res.status(400).json({ message: 'Role is required', status: 'error' });
            }

            const updatedMembership = await membershipService.updateMembership( membershipId as string, { role } );
            return res.status(200).json( updatedMembership );
        } catch( error ){
            return next( error );
        }
    }

    //DELETE /api/v1/memberships/:membershipId
    async deleteMembership( req: Request, res: Response, next: NextFunction ){
        try {
            const { membershipId } = req.params;
            if( !membershipId ){
                return res.status(400).json({ message: 'Membership ID is required', status: 'error' });
            }

            await membershipService.deleteMembership( membershipId as string );
            return res.status(204).send();
        } catch( error ){
            return next( error );
        }
    }
}