import {
    CreateCourseUseCase,
    GetCourseByIdUseCase,
    GetCoursesUseCase,
    UpdateCourseUseCase,
} from '../../../src/application/use-case';
import { DeleteCourseUseCase } from '../../../src/application/use-case/course/delete-course';
import { Id } from '../../../src/domain';
import { courseUseCaseMocks } from './course.use-case.mock';

export const mockProviders = [
    {
        provider: CreateCourseUseCase,
        mock: courseUseCaseMocks.create,
    },
    {
        provider: GetCoursesUseCase,
        mock: courseUseCaseMocks.get,
    },
    {
        provider: GetCourseByIdUseCase,
        mock: courseUseCaseMocks.getById,
    },
    {
        provider: UpdateCourseUseCase,
        mock: courseUseCaseMocks.update,
    },
    {
        provider: DeleteCourseUseCase,
        mock: courseUseCaseMocks.delete,
    },
];

export const mockIds = {
    id: Id.generate(),
    coachId: Id.generate(),
    name: '1',
    description: '',
};
