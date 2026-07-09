import { Router } from "express";
import { MembershipController } from "./controllers/MembershipController.js";
import { validate } from "../middleware/validation.middleware.js";
import {
    createMembershipSchema,
    getMembershipSchema,
    listMembershipsSchema,
    updateMembershipSchema,
    deleteMembershipSchema
} from "./schemas.js";

const router = Router();
const membershipController = new MembershipController();

//POST /api/v1/memberships
router.post(
    '/memberships',
    validate(createMembershipSchema),
    membershipController.createMembership
);

//GET /api/v1/memberships/:membershipId
router.get(
    '/memberships/:membershipId',
    validate(getMembershipSchema),
    membershipController.getMembership
);

//GET /api/v1/memberships
router.get(
    '/memberships',
    validate(listMembershipsSchema),
    membershipController.listMemberships
);

//PUT /api/v1/memberships/:membershipId
router.put(
    '/memberships/:membershipId',
    validate(updateMembershipSchema),
    membershipController.updateMembership
);

//DELETE /api/v1/memberships/:membershipId
router.delete(
    '/memberships/:membershipId',
    validate(deleteMembershipSchema),
    membershipController.deleteMembership
);

export { router as membershipRouter };