import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CustomersController from '../controller/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(ensureAuthenticated);

customersRouter.post('/', customersController.create);

export default customersRouter;
