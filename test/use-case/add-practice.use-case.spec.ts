import { Test, TestingModule } from '@nestjs/testing';
import {
    AddPracticeUseCase,
    AddPracticeUseCaseDto,
} from '../../src/application/use-case';
import { Course, CourseRepository, Id, Practice, Url } from '../../src/domain';
import { courseRepositoryMock } from './mock/course.repository.mock';
import { CourseValidateDto } from './dto';

describe('AddPracticeUseCase', () => {
    let useCase: AddPracticeUseCase;
    let courseId: Id;
    const coachId = Id.generate();

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                AddPracticeUseCase,
                { provide: CourseRepository, useValue: courseRepositoryMock },
            ],
        }).compile();

        useCase = app.get<AddPracticeUseCase>(AddPracticeUseCase);

        await courseRepositoryMock
            .add(
                new Course({
                    id: Id.generate(),
                    name: 'Course',
                    description: '',
                    coachId,
                    practices: [
                        new Practice({
                            id: Id.generate(),
                            name: 'Practice1',
                            description: '',
                            url: new Url('www.mfr.hub'),
                        }),
                    ],
                }),
            )
            .then((course) => {
                courseId = course.unpack().id;
            });
    });

    it('must be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('success', async () => {
        const dto = new AddPracticeUseCaseDto(
            courseId,
            coachId,
            'Practice2',
            '',
            new Url('www.mfr.hub'),
        );

        const course = await useCase.execute(dto);
        CourseValidateDto.validate(course);
        expect(course.unpack().coachId.isEqual(coachId)).toBeTruthy();
        expect(course.unpack().practices.length).toBe(2);
    });

    it('failed try to add practice with same name', async () => {
        const dto = new AddPracticeUseCaseDto(
            courseId,
            coachId,
            'Practice1',
            '',
            new Url('www.mfr.hub'),
        );

        expect(() => useCase.execute(dto)).rejects.toThrow(Error);
    });

    it('failed bad course id', async () => {
        const dto = new AddPracticeUseCaseDto(
            Id.generate(),
            coachId,
            'Practice3',
            '',
            new Url('www.mfr.hub'),
        );

        expect(() => useCase.execute(dto)).rejects.toThrow(Error);
    });

    it('failed bad coach id', async () => {
        const dto = new AddPracticeUseCaseDto(
            courseId,
            Id.generate(),
            'Practice3',
            '',
            new Url('www.mfr.hub'),
        );

        expect(() => useCase.execute(dto)).rejects.toThrow(Error);
    });
});
