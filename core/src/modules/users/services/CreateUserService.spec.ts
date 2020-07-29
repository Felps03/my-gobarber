import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUserService', () => {
	it('should be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		const user = await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: 'amsdi2',
		});
		expect(user).toHaveProperty('id');
	});
	it('should not be able to create a new user with same email from', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: 'amsdi2',
		});
		await expect(
			createUser.execute({
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: 'amsdi2',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});