import { Elysia } from 'elysia';

import { swagger } from '@elysiajs/swagger';

import itemRoutes from './routes/itemRoutes';

const app = new Elysia().use(swagger()).use(itemRoutes);

const PORT = Bun.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
