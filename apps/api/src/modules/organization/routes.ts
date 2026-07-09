import { Router } from "express";
import { OrganizationController } from "./controllers/OrganizationController.js";
import { validate } from "../middleware/validation.middleware.js";
import {
    createOrganizationSchema,
    getOrganizationSchema,
    listOrganizationsSchema,
    updateOrganizationSchema,
    deleteOrganizationSchema
} from "./schemas.js";

const router = Router();
const organizationController = new OrganizationController();

//POST /api/v1/organizations
router.post(
    '/organizations',
    validate(createOrganizationSchema),
    organizationController.createOrganization
);

//GET /api/v1/organizations/:organizationId
router.get(
    '/organizations/:organizationId',
    validate(getOrganizationSchema),
    organizationController.getOrganization
);

//GET /api/v1/organizations
router.get(
    '/organizations',
    validate(listOrganizationsSchema),
    organizationController.listOrganizations
);

//PUT /api/v1/organizations/:organizationId
router.put(
    '/organizations/:organizationId',
    validate(updateOrganizationSchema),
    organizationController.updateOrganization
);

//DELETE /api/v1/organizations/:organizationId
router.delete(
    '/organizations/:organizationId',
    validate(deleteOrganizationSchema),
    organizationController.deleteOrganization
);

export { router as organizationRouter };