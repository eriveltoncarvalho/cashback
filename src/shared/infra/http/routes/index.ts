import { Router } from 'express';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import salesRouter from '@modules/sales/infra/http/routes/sales.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/products', productsRouter);
routes.use('/sales', salesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;

