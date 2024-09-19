import { mockIds } from '.';
import {
    CreateCourseUseCaseDto,
    GetCourseByIdUseCaseDto,
    GetCoursesFilterDto,
    UpdateCourseUseCaseDto,
} from '../../../src/application/use-case';
import { Course } from '../../../src/domain';
import { SuccessResponseDto } from '../../../src/infrastructure/api/common/success-response.dto';

export const courseUseCaseMocks = {
    create: {
        execute: (dto: CreateCourseUseCaseDto): Course => {
            return new Course(
                mockIds.id,
                dto.name,
                dto.description,
                dto.coachId,
            );
        },
    },
    get: {
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
    getById: {
        execute: ({ id }: GetCourseByIdUseCaseDto): Course => {
            return new Course(
                id,
                mockIds.name,
                mockIds.description,
                mockIds.coachId,
            );
        },
    },
    update: {
        execute: ({ id }: UpdateCourseUseCaseDto): Course => {
            return new Course(
                id,
                mockIds.name,
                mockIds.description,
                mockIds.coachId,
            );
        },
    },
    delete: {
        execute: () => {
            return new SuccessResponseDto();
        },
    },
};
