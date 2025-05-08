import {Router} from 'express'
import { renderRedirect } from '../controllers/redirectController.js';

export const redirectRouter = Router();

// Default route to render the redirect page
redirectRouter.get("/:shortURL", renderRedirect);
