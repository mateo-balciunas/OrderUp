import * as MembershipTypes from "../types.js";
import { prisma } from "@orderup/db";
import { NotFoundError  } from '../../../utils/errors.js';

export class MembershipService {

    //============
    // CREATE MEMBERSHIP
    //============
    async createMembership( userId: string, organizationId: string , role: MembershipTypes.MembershipRole ): Promise<MembershipTypes.MembershipResponse> {
        //Validate userId and organizationId
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId }
        });

        if( !user || !organization){
            throw new NotFoundError( 'User or organization not found' );
        };

        //Create membership
        const membership = await prisma.membership.create({
            data: {
                userId: userId,
                organizationId: organizationId,
                role: 'operator'
            }
        });

        return membership;
    }

    //============
    // GET MEMBERSHIP
    //============
    async getMembership( membershipId: string ): Promise<MembershipTypes.MembershipResponse> {
        //Validate membershipId
        const membership = await prisma.membership.findUnique({
            where: { id: membershipId }
        });

        if( !membership ){
            throw new NotFoundError( 'Membership not found' );
        };

        return membership;
    }

    //============
    //LIST MEMBERSHIPS
    //============
    async listMemberships( filters?: { userId?: string, organizationId?: string }): Promise<MembershipTypes.ListMembershipsResponse> {
        const memberships = await prisma.membership.findMany({
            where: {
                userId: filters?.userId,
                organizationId: filters?.organizationId
            }
        });
        
        return { 
            memberships, 
            total: memberships.length, 
            page: 1, 
            limit: memberships.length 
        };
    }

    //============
    //UPDATE MEMBERSHIP
    //============
    async updateMembership( membershipId: string, { role }: MembershipTypes.UpdateMembershipRequest ): Promise<MembershipTypes.MembershipResponse> {
        if (!role) {
            throw new Error('Role is required');
        }
        try {
            const updatedMembership = await prisma.membership.update({
                where: { id: membershipId },
                data: { role: role }
            });
            return updatedMembership;
        } catch (error) {
            throw new NotFoundError('Membership not found');
        }
    }

    //============
    //DELETE MEMBERSHIP
    //============
    async deleteMembership( membershipId: string ): Promise<MembershipTypes.DeleteMembershipResponse>{
        //Validate membershipId
        const membership = await prisma.membership.findUnique({
            where: { id: membershipId }
        });
        if( !membership ){
            throw new NotFoundError( 'Membership not found' );
        };

        //Delete membership
        await prisma.membership.delete({
            where: { id: membershipId }
        });

        return { id: membershipId };
    }
}