import {
    AddPracticeUseCase,
    CreateCourseUseCase,
    GetCourseByIdUseCase,
    GetCoursesUseCase,
    UpdateCourseUseCase,
} from '../../../src/application/use-case';
import { DeleteCourseUseCase } from '../../../src/application/use-case/course/delete-course';
import { Id, Practice, Url } from '../../../src/domain';
import { ConfigService } from '../../../src/infrastructure/config';
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
    {
        provider: AddPracticeUseCase,
        mock: courseUseCaseMocks.addPractice,
    },
    // need for tests working without .env file (used in AuthModule)
    {
        provider: ConfigService,
        mock: { api: { auth: '/' } },
    },
];

export const mockCourse = {
    id: Id.generate(),
    coachId: Id.generate(),
    name: '1',
    description: '',
    practices: [
        new Practice({
            id: Id.generate(),
            name: 'Practice1',
            description: '',
            url: new Url('www.mfr.hub'),
        }),
    ],
};
