import { Request, Response, NextFunction } from 'express';
import { ChannelService } from '../services/ChannelService.js';

const channelService = new ChannelService();

export class ChannelConnectionController {

    //POST /api/v1/:organizationId/channels
    async createChannelConnection( req: Request, res: Response, next: NextFunction ) {
        try {
            const { organizationId, channelType, name, config, isActive } = req.body;
            if( !organizationId || !channelType || !name || !config || !isActive ){
                return res.status(400).json({ message: 'All fields are required', status: 'error' });
            }

            const data = {
                organizationId,
                channelType,
                name,
                config,
                isActive
            }
            const channelConnection = await channelService.createChannelConnection( data );
            return res.status(201).json(channelConnection);

        } catch( error ){
            return next( error );
        }
    }

    // GET /api/V1/:organizationId/channels/:channelId
    async getChannelConnection( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract and validate channelConnectionId
            const { channelConnectionId, organizationId } = req.params;
            if( !channelConnectionId || !organizationId ){
                return res.status(400).json({ message: 'Channel connection ID and organization ID are required', status: 'error' });
            }

            const channelConnection = await channelService.getChannelConnection( channelConnectionId as string);
            return res.status(200).json(channelConnection);

        } catch( error ){
            return next( error );
        }
    }

    //GET /api/v1/:organizationId/channels
    async listChannelConnections( req: Request, res: Response, next: NextFunction ){
        try {
            const { organizationId } = req.params;
            if( !organizationId ){
                return res.status(400).json({ message: 'Organization ID is required', status: 'error' });
            }

            const channelConnections = await channelService.listChannelConnections( organizationId as string);
            return res.status(200).json(channelConnections);

        } catch( error ){
            return next( error );
        }
    }

    //PUT /api/v1/:organizationId/channels/:channelId
    async updateChannelConnection( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract and validate channelConnectionId
            const { channelConnectionId, organizationId } = req.params;
            if( !channelConnectionId || !organizationId ){
                return res.status(400).json({ message: 'Channel connection ID and organization ID are required', status: 'error' });
            }

            const data = req.body;
            const updatedChannelConnection = await channelService.updateChannelConnection( channelConnectionId as string, data );
            return res.status(200).json(updatedChannelConnection);
        } catch( error ){
            return next( error );
        }
    }

    //DELETE /api/v1/:organizationId/channels/:channelId
    async deleteChannelConnection( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract and validate channelConnectionId
            const { channelConnectionId, organizationId } = req.params;
            if( !channelConnectionId || !organizationId ){
                return res.status(400).json({ message: 'Channel connection ID and organization ID are required', status: 'error' });
            }
            await channelService.deleteChannelConnection( channelConnectionId as string);
            return res.status(204).send();
        } catch( error ){
            return next( error );
        }
    }
}