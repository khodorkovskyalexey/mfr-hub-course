import { Test, TestingModule } from '@nestjs/testing';
import {
    CreateCourseUseCaseDto,
    CreateCourseUseCase,
} from '../../src/application/use-case';
import { CourseRepository, Id } from '../../src/domain';
import { courseRepositoryMock } from './mock/course.repository.mock';
import { CourseValidateDto } from './dto';

describe('CreateCourseUseCase', () => {
    let useCase: CreateCourseUseCase;
    const coachId = Id.generate();

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCourseUseCase,
                { provide: CourseRepository, useValue: courseRepositoryMock },
            ],
        }).compile();

        useCase = app.get<CreateCourseUseCase>(CreateCourseUseCase);
    });

    it('must be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('success', async () => {
        const dto = new CreateCourseUseCaseDto('Course1', '', coachId);

        const course = await useCase.execute(dto);
        CourseValidateDto.validate(course);
        expect(course.coachId.isEqual(coachId)).toBeTruthy();
    });

    it('failed try to create same course', async () => {
        const dto = new CreateCourseUseCaseDto('Course1', '', coachId);

        expect(() => useCase.execute(dto)).rejects.toThrow(Error);
    });
});
