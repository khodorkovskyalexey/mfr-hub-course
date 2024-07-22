import { mockIds } from '.';
import {
    CreateCourseUseCaseDto,
    GetCourseByIdUseCaseDto,
    GetCoursesFilterDto,
    UpdateCourseUseCaseDto,
} from '../../../src/application/use-case';
import { Course } from '../../../src/domain';

export const courseUseCaseMocks = {
    createCourse: {
        execute: (dto: CreateCourseUseCaseDto): Course => {
            return new Course(
                mockIds.id,
                dto.name,
                dto.description,
                dto.coachId,
            );
        },
    },
    getCourses: {
        execute: (filter: GetCoursesFilterDto): Course[] => {
            if (filter.coachId && filter.coachId.value !== 1) {
                return [];
            }

            return [
                new Course(
                    mockIds.id,
                    mockIds.name,
                    mockIds.description,
                    mockIds.coachId,
                ),
            ];
        },
    },
    getCourseById: {
        execute: ({ id }: GetCourseByIdUseCaseDto): Course => {
            return new Course(
                id,
                mockIds.name,
                mockIds.description,
                mockIds.coachId,
            );
        },
    },
    updateCourse: {
        execute: ({ id }: UpdateCourseUseCaseDto): Course => {
            return new Course(
                id,
                mockIds.name,
                mockIds.description,
                mockIds.coachId,
            );
        },
    },
};
