import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import {
    CreateCourseUseCaseDto,
    CreateCourseUseCase,
    GetCoursesUseCase,
} from '../../../application/use-case';
import {
    CourseResponseDto,
    CreateCourseRequestDto,
    GetCoursesFilterRequestDto,
} from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Id } from '../../../domain';

@ApiTags('Course')
@Controller({
    version: 'v1',
    path: 'courses',
})
export class CourseController {
    constructor(
        private readonly createCourseUseCase: CreateCourseUseCase,
        private readonly getCoursesUseCase: GetCoursesUseCase,
    ) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        type: CourseResponseDto,
    })
    @ApiOperation({ summary: 'Create course' })
    @Post()
    async create(
        @Body() { name, description, coachId }: CreateCourseRequestDto,
    ): Promise<CourseResponseDto> {
        const course = await this.createCourseUseCase.execute(
            new CreateCourseUseCaseDto(name, description, new Id(coachId)),
        );

        return CourseResponseDto.fromEntity(course);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: [CourseResponseDto],
    })
    @ApiOperation({ summary: 'Get courses' })
    @Get()
    async get(
        @Query() filter: GetCoursesFilterRequestDto,
    ): Promise<CourseResponseDto[]> {
        const courses = await this.getCoursesUseCase.execute({
            coachId:
                filter.coachId != null ? new Id(filter.coachId) : undefined,
        });

        return courses.map(CourseResponseDto.fromEntity);
    }
}
