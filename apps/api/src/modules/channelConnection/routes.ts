import { Router } from "express";
import { ChannelConnectionController } from "./controllers/ChannelConnectionController.js";
import { validate } from "../../middleware/validation.middleware.ts";
import {
    createChannelConnectionSchema,
    getChannelConnectionSchema,
    listChannelConnectionsSchema,
    updateChannelConnectionSchema,
    deleteChannelConnectionSchema
} from "./schemas.js";

const router = Router();
const channelConnectionController = new ChannelConnectionController();

//POST /api/v1/:organizationId/channels
router.post(
    '/:organizationId/channels',
    validate(createChannelConnectionSchema),
    channelConnectionController.createChannelConnection
);

//GET /api/v1/:organizationId/channels/:channelId
router.get(
    '/:organizationId/channels/:channelId',
    validate(getChannelConnectionSchema),
    channelConnectionController.getChannelConnection
);

//GET /api/v1/:organizationId/channels
router.get(
    '/:organizationId/channels',
    validate(listChannelConnectionsSchema),
    channelConnectionController.listChannelConnections
);

//PUT /api/v1/:organizationId/channels/:channelId
router.put(
    '/:organizationId/channels/:channelId',
    validate(updateChannelConnectionSchema),
    channelConnectionController.updateChannelConnection
);

//DELETE /api/v1/:organizationId/channels/:channelId
router.delete(
    '/:organizationId/channels/:channelId',
    validate(deleteChannelConnectionSchema),
    channelConnectionController.deleteChannelConnection
);

export { router as channelConnectionRouter };