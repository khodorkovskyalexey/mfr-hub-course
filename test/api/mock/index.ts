import {
    CreateCourseUseCase,
    GetCourseByIdUseCase,
    GetCoursesUseCase,
    UpdateCourseUseCase,
} from '../../../src/application/use-case';
import { Id } from '../../../src/domain';
import { courseUseCaseMocks } from './course.use-case.mock';

export const mockProviders = [
    {
        provider: CreateCourseUseCase,
        mock: courseUseCaseMocks.createCourse,
    },
    {
        provider: GetCoursesUseCase,
        mock: courseUseCaseMocks.getCourses,
    },
    {
        provider: GetCourseByIdUseCase,
        mock: courseUseCaseMocks.getCourseById,
    },
    {
        provider: UpdateCourseUseCase,
        mock: courseUseCaseMocks.updateCourse,
    },
];

export const mockIds = {
    id: Id.generate(),
    coachId: Id.generate(),
    name: '1',
    description: '',
};
