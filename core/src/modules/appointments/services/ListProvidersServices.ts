import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
	user_id: string;
}

@injectable()
export default class ListProvidersService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	/**
	 * execute
	 */
	public async execute({ user_id }: IRequestDTO): Promise<User[]> {
		const users = await this.usersRepository.findAllProviders({
			except_user_id: user_id,
		});

		return users;
	}
}
