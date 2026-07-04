import * as ChannelConnectionTypes from "../types.js";
import { InputJsonValue, JsonValue, prisma } from "@orderup/db";

export class ChannelService {

    //============
    // CREATE CHANNEL CONNECTION
    //============
    async createChannelConnection( data: ChannelConnectionTypes.CreateChannelConnectionRequest ): Promise<ChannelConnectionTypes.ChannelConnectionResponse> {
        //Validate organizationId
        const organization = await prisma.organization.findUnique({
            where: { id: data.organizationId }
        });
        if( !organization ){
            throw new Error( 'Organization not found' );
        }

        //Create channel connection
        const channelConnection = await prisma.channelConnection.create({
            data: {
                organizationId: data.organizationId,
                channelType: data.channelType,
                name: data.name,
                config: data.config,
                isActive: data.isActive
            }
        });

        return channelConnection;
    }

    //============
    // GET CHANNEL CONNECTION
    //============
    async getChannelConnection( channelConnectionId: string ): Promise<ChannelConnectionTypes.ChannelConnectionResponse> {
        //Validate channelConnectionId
        const channelConnection = await prisma.channelConnection.findUnique({
            where: { id: channelConnectionId }
        });
        if( !channelConnection ){
            throw new Error( 'Channel connection not found' );
        }

        return channelConnection;
    }

    //============
    //LIST CHANNEL CONNECTIONS
    //============
    async listChannelConnections( organizationId: string ): Promise<ChannelConnectionTypes.ChannelConnectionResponse[]> {
        //Validate organizationId
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId }
        });
        if( !organization ){
            throw new Error( 'Organization not found' );
        }
        
        //List channel connections
        const channelConnections = await prisma.channelConnection.findMany({
            where: { organizationId: organizationId }
        });
        return channelConnections;
    }

    //============
    //UPDATE CHANNEL CONNECTION
    //============
    async updateChannelConnection( channelConnectionId: string, data: ChannelConnectionTypes.UpdateChannelConnectionRequest): Promise<ChannelConnectionTypes.UpdateChannelConnectionResponse> {
        //Validate channelConnectionId
        const channelConnection = await prisma.channelConnection.findUnique({
            where: { id: channelConnectionId }
        });
        if( !channelConnection ){
            throw new Error( 'Channel connection not found' );
        }

        //Update channel connection
        const updatedChannelConnection = await prisma.channelConnection.update({
            where: { id: channelConnectionId },
            data: {
                channelType: data.channelType,
                name: data.name,
                config: data.config,
                isActive: data.isActive
            }
        })
        return updatedChannelConnection;
    }

    //============
    //DELETE CHANNEL CONNECTION
    //============
    async deleteChannelConnection( channelConnectionId: string ): Promise<ChannelConnectionTypes.DeleteChannelConnectionResponse> {
        //Validate channelConnectionId
        const channelConnection = await prisma.channelConnection.findUnique({
            where: { id: channelConnectionId }
        });
        if( !channelConnection ){
            throw new Error( 'Channel connection not found' );
        }

        //Delete channel connection
        await prisma.channelConnection.delete({
            where: { id: channelConnectionId }
        });
        return { id: channelConnectionId };
    }
}