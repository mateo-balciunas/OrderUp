import { Router } from "express";
import { MembershipController } from "./controllers/MembershipController.js";

const router = Router();
const membershipController = new MembershipController();

//POST /api/v1/memberships
router.post(
    '/memberships',
    membershipController.createMembership
);

//GET /api/v1/memberships/:membershipId
router.get(
    '/memberships/:membershipId',
    membershipController.getMembership
);

//GET /api/v1/memberships
router.get(
    '/memberships',
    membershipController.listMemberships
);

//PUT /api/v1/memberships/:membershipId
router.put(
    '/memberships/:membershipId',
    membershipController.updateMembership
);

//DELETE /api/v1/memberships/:membershipId
router.delete(
    '/memberships/:membershipId',
    membershipController.deleteMembership
);

export { router as membershipRouter };