import { Router } from "express";
import { ChannelConnectionController } from "./controllers/ChannelConnectionController.ts";

const router = Router();
const channelConnectionController = new ChannelConnectionController();

//POST /api/v1/:organizationId/channels
router.post(
    '/:organizationId/channels',
    channelConnectionController.createChannelConnection
);

//GET /api/v1/:organizationId/channels/:channelId
router.get(
    '/:organizationId/channels/:channelId',
    channelConnectionController.getChannelConnection
);

//GET /api/v1/:organizationId/channels
router.get(
    '/:organizationId/channels',
    channelConnectionController.listChannelConnections
);

//PUT /api/v1/:organizationId/channels/:channelId
router.put(
    '/:organizationId/channels/:channelId',
    channelConnectionController.updateChannelConnection
);

//DELETE /api/v1/:organizationId/channels/:channelId
router.delete(
    '/:organizationId/channels/:channelId',
    channelConnectionController.deleteChannelConnection
);

export { router as channelConnectionRouter };