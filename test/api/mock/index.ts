import {
    CreateCourseUseCase,
    GetCoursesUseCase,
} from '../../../src/application/use-case';
import { createCourseUseCaseMock } from './create-course.use-case.mock';
import { getCoursesUseCaseMock } from './get-courses.use-case.mock';

export const mockProviders = [
    {
        provider: CreateCourseUseCase,
        mock: createCourseUseCaseMock,
    },
    {
        provider: GetCoursesUseCase,
        mock: getCoursesUseCaseMock,
    },
];
