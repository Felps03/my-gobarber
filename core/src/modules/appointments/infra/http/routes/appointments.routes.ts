import { container } from 'tsyringe';
import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();
/* appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointment = await appointmentsRepository.find();
	return response.json(appointment);
}); */
appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = container.resolve(CreateAppointmentService);

	const appointment = await createAppointment.execute({
		provider_id,
		date: parsedDate,
	});
	return response.json(appointment);
});

export default appointmentsRouter;
