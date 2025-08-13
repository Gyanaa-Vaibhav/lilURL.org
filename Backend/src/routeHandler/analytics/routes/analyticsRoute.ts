import {Router} from 'express';
import { renderAnalytics } from '../controllers/analyticsController.js';
import { geoAnalytics } from "../controllers/geoAnalytics.js";
import { deviceAnalytics } from "../controllers/deviceAnalytics.js";
import {clickAnalytics} from "../controllers/clickAnalytics.js";
import {timeCheckMiddleware} from "../controllers/timeCheckMiddleware.js";
import {osAnalytics} from "../controllers/osAnalytics.js";
import validateUserId from "../utils/validateUserId.js";

export const analyticsRouter = Router();
// TODO need to redirect / to react
// Default route to render the analytics page
analyticsRouter.get('/g', renderAnalytics);
analyticsRouter.use(timeCheckMiddleware);
analyticsRouter.get('/:userId',validateUserId ,renderAnalytics);
analyticsRouter.get("/:linkId/os", osAnalytics);
analyticsRouter.get("/:linkId/devices", deviceAnalytics);
analyticsRouter.get("/:linkId/geo", geoAnalytics);
analyticsRouter.get("/:linkId/clicks", clickAnalytics);
