import {
    CreateCourseUseCase,
    GetCoursesUseCase,
    UpdateCourseUseCase,
} from '../../../src/application/use-case';
import { Id } from '../../../src/domain';
import { createCourseUseCaseMock } from './create-course.use-case.mock';
import { getCoursesUseCaseMock } from './get-courses.use-case.mock';
import { updateCourseUseCaseMock } from './update-course.use-case.mock';

export const mockProviders = [
    {
        provider: CreateCourseUseCase,
        mock: createCourseUseCaseMock,
    },
    {
        provider: GetCoursesUseCase,
        mock: getCoursesUseCaseMock,
    },
    {
        provider: UpdateCourseUseCase,
        mock: updateCourseUseCaseMock,
    },
];

export const mockIds = {
    id: Id.generate(),
    coachId: Id.generate(),
};
