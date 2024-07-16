import { Course, GetCourseFilter, GetCourseOptions } from '../../../src/domain';

const courses: Course[] = [];

export const courseRepositoryMock = {
    add: (dto: Course) =>
        new Promise((resolve) => {
            courses.push(dto);
            resolve(dto);
        }),

    get: (filter?: GetCourseFilter, options?: GetCourseOptions) =>
        new Promise((resolve) => {
            const i = 0;

            resolve(
                courses.filter((course) => {
                    return (
                        (options?.limit == null || i < options.limit) &&
                        (!filter?.name || filter.name === course.name) &&
                        (!filter?.coachId || filter.coachId.isEqual(course.coachId))
                    );
                }),
            );
        }),
};
