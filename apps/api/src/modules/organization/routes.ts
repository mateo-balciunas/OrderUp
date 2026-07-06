import { Router } from "express";
import { OrganizationController } from "./controllers/OrganizationController.js";

const router = Router();
const organizationController = new OrganizationController();

//POST /api/v1/organizations
router.post(
    '/organizations',
    organizationController.createOrganization
);

//GET /api/v1/organizations/:organizationId
router.get(
    '/organizations/:organizationId',
    organizationController.getOrganization
);

//GET /api/v1/organizations
router.get(
    '/organizations',
    organizationController.listOrganizations
);

//PUT /api/v1/organizations/:organizationId
router.put(
    '/organizations/:organizationId',
    organizationController.updateOrganization
);

//DELETE /api/v1/organizations/:organizationId
router.delete(
    '/organizations/:organizationId',
    organizationController.deleteOrganization
);

export { router as organizationRouter };