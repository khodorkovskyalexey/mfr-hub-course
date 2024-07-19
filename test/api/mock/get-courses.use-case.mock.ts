import { GetCoursesFilterDto } from '../../../src/application/use-case';
import { Course, Id } from '../../../src/domain';

export const getCoursesUseCaseMock = {
    execute: (filter: GetCoursesFilterDto): Course[] => {
        if (filter.coachId && filter.coachId.value !== 1) {
            return [];
        }

        return [
            Course.create({
                name: '123',
                description: '',
                coachId: new Id(1),
            }),
        ];
    },
};
