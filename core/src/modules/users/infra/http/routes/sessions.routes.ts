import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	const { password, email } = request.body;
	const authenticateUser = container.resolve(AuthenticateUserService);
	const { user, token } = await authenticateUser.execute({
		email,
		password,
	});
	delete user.password;
	return response.json({ user, token });
});

export default sessionsRouter;
