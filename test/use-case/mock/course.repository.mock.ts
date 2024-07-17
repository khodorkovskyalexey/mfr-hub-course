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
            let res = courses.filter((course) => {
                return (
                    (!filter?.name || filter.name === course.name) &&
                    (!filter?.coachId || filter.coachId.isEqual(course.coachId))
                );
            });

            if (options?.limit) {
                res = res.slice(0, options.limit);
            }

            resolve(res);
        }),
};
