import { mockCourse } from '.';
import {
    AddPracticeUseCaseDto,
    CreateCourseUseCaseDto,
    GetCourseByIdUseCaseDto,
    GetCoursesFilterDto,
    UpdateCourseUseCaseDto,
} from '../../../src/application/use-case';
import { Course } from '../../../src/domain';
import { SuccessResponseDto } from '../../../src/infrastructure/api/common';

export const courseUseCaseMocks = {
    create: {
        execute: (dto: CreateCourseUseCaseDto): Course => {
            return new Course({
                id: mockCourse.id,
                name: dto.name,
                description: dto.description,
                coachId: dto.coachId,
                practices: [],
            });
        },
    },
    get: {
        execute: (filter: GetCoursesFilterDto): Course[] => {
            if (filter.coachId && filter.coachId.value !== 1) {
                return [];
            }

            return [
                new Course({
                    id: mockCourse.id,
                    name: mockCourse.name,
                    description: mockCourse.description,
                    coachId: mockCourse.coachId,
                    practices: mockCourse.practices,
                }),
            ];
        },
    },
    getById: {
        execute: ({ id }: GetCourseByIdUseCaseDto): Course => {
            return new Course({
                id,
                name: mockCourse.name,
                description: mockCourse.description,
                coachId: mockCourse.coachId,
                practices: mockCourse.practices,
            });
        },
    },
    update: {
        execute: ({ id }: UpdateCourseUseCaseDto): Course => {
            return new Course({
                id,
                name: mockCourse.name,
                description: mockCourse.description,
                coachId: mockCourse.coachId,
                practices: mockCourse.practices,
            });
        },
    },
    delete: {
        execute: () => {
            return new SuccessResponseDto();
        },
    },
    addPractice: {
        execute: ({ courseId }: AddPracticeUseCaseDto) => {
            return new Course({
                id: courseId,
                name: mockCourse.name,
                description: mockCourse.description,
                coachId: mockCourse.coachId,
                practices: mockCourse.practices,
            });
        },
    },
};
