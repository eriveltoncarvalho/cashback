import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SalesController from '../controller/SalesController';

const salesRouter = Router();
const salesController = new SalesController();

salesRouter.use(ensureAuthenticated);

salesRouter.post('/', salesController.create);
salesRouter.get('/:id', salesController.show);

export default salesRouter;
