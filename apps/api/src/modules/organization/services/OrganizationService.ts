import * as OrganizationTypes from '../types.js';
import { prisma } from '@orderup/db';
import { ConflictError, NotFoundError  } from '../../../utils/errors.js';

export class OrganizationService {

    // ============
    // CREATE ORGANIZATION
    // ============
    async createOrganization( { name, plan }: OrganizationTypes.CreateOrganizationRequest): Promise<OrganizationTypes.OrganizationResponse> {

        //Validate organization name
        const existingOrganization = await prisma.organization.findUnique({
            where: { name: name }
        });

        if( existingOrganization ){
            throw new ConflictError( 'Organization already exists' );
        }

        //Create organization
        const newOrganization = await prisma.organization.create({
            data: {
                name: name,
                plan: plan
            },
            include: {
                users: true,
                orders: {
                    include: {
                        lines: true
                    }
                }
            }
        });
        return newOrganization;
    }

    // ============
    // GET ORGANIZATION
    // ============
    async getOrganization( organizationId: string ): Promise<OrganizationTypes.GetOrganizationResponse> {

        //Search for organzation
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId },
            include: {
                users: true,
                orders: {
                    include: {
                        lines: true
                    }
                }
            }
        });

        if( !organization ){
            throw new NotFoundError( 'Organization not found' );
        }
        return organization;
    }

    // ============
    // LIST ORGANIZATIONS
    // ============
    async listOrganizations( filters?: { name?: string, plan?: 'basic' | 'pro' }): Promise<OrganizationTypes.ListOrganizationsResponse> {

        //Search for organizations
        const organizations = await prisma.organization.findMany({
            where: {
                name: filters?.name ? { contains: filters.name, mode: 'insensitive' }: undefined,
                plan: filters?.plan ? { equals: filters.plan }: undefined,
            },
            include: {
                users: true,
                orders: {
                    include: {
                        lines: true
                    }
                }
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        return {
            organizations: organizations,
            total: organizations.length,
            page: 1,
            limit: organizations.length
        }
    }

    // ============
    // UPDATE ORGANIZATION
    // ============
    async updateOrganization( organizationId: string, { name, plan }: OrganizationTypes.UpdateOrganizationRequest): Promise<OrganizationTypes.UpdateOrganizationResponse> {
        //Search for organization
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId },
            include: {
                users: true,
                orders: {
                    include: {
                        lines: true
                    }
                }
            }
        });

        if( !organization ){
            throw new NotFoundError( 'Organization not found' );
        }

        //Update organization
        const updatedOrganization = await prisma.organization.update({
            where: { id: organizationId },
            data: {
                name: name || organization.name,
                plan: plan || organization.plan,

            },
            include: {
                users: true,
                orders: {
                    include: {
                        lines: true
                    }
                }
            }
        });

        return updatedOrganization;
    }

    // ============
    // DELETE ORGANIZATION
    // ============
    async deleteOrganization( organizationId: string ): Promise<OrganizationTypes.DeleteOrganizationResponse> {
        //Search for organization
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId },
            include: {
                users: true,
                orders: true
            }
        });

        if( !organization ){
            throw new NotFoundError( 'Organization not found' );
        }
        
        //Delete organization
        await prisma.organization.delete({
            where: { id: organizationId }
        });

        return {
            id: organizationId,
            name: organization.name
        }
    }
}