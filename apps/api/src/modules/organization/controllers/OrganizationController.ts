import { Request, Response, NextFunction } from "express";
import { OrganizationService } from "../services/OrganizationService.ts";

const organizationService = new OrganizationService();

export class OrganizationController {

    //POST /api/v1/organizations
    async createOrganization( req: Request, res: Response, next: NextFunction ){
        try {
            const { name, plan } = req.body;
            if( !name || !plan ){
                return res.status(400).json({ message: 'Name and plan are required', status: 'error' });
            }
            const organization = await organizationService.createOrganization({ name, plan });
            return res.status(201).json(organization);
        } catch( error ){
            return next( error );
        }
    }

    //GET /api/v1/organizations/:organizationId
    async getOrganization( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract and validate organizationId
            const { organizationId } = req.params;
            if( !organizationId ){
                return res.status(400).json({ message: 'Organization ID is required', status: 'error' });
            }

            const organization = await organizationService.getOrganization( organizationId as string );
            return res.status(200).json(organization);
        } catch( error ){
            return next( error );
        }
    }

    //GET /api/v1/organizations
    async listOrganizations( req: Request, res: Response, next: NextFunction ){
        try {
            const organizations = await organizationService.listOrganizations();
            return res.status(200).json(organizations);
        } catch( error ){
            return next( error );
        }
    }

    //PUT /api/v1/organizations/:organizationId
    async updateOrganization( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract and validate organizationId
            const { organizationId } = req.params;
            if( !organizationId ){
                return res.status(400).json({ message: 'Organization ID is required', status: 'error' });
            }
            //Extract and validate name and plan
            const { name, plan } = req.body;

            const organization = await organizationService.updateOrganization( organizationId as string, { name, plan });
            return res.status(200).json(organization);
        } catch( error ){
            return next( error );
        }
    }

    //DELETE /api/v1/organizations/:organizationId
    async deleteOrganization( req: Request, res: Response, next: NextFunction) {
        try {
            //Extract and validate organizationId
            const { organizationId } = req.params;
            if( !organizationId ){
                return res.status(400).json({ message: 'Organization ID is required', status: 'error' });
            }

            await organizationService.deleteOrganization( organizationId as string );
            return res.status(204).send();
        } catch( error ){
            return next( error );
        }
    }
}