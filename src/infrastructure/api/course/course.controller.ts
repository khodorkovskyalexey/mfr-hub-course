import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    CreateCourseUseCaseDto,
    CreateCourseUseCase,
    GetCoursesUseCase,
    UpdateCourseUseCase,
    UpdateCourseUseCaseDto,
    GetCoursesFilterDto,
    GetCourseByIdUseCase,
    GetCourseByIdUseCaseDto,
} from '../../../application/use-case';
import {
    CourseResponseDto,
    CreateCourseRequestDto,
    GetCoursesFilterRequestDto,
    UpdateCourseRequestDto,
} from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Id } from '../../../domain';
import { IdParameter } from '../common';

@ApiTags('Course')
@Controller({
    version: 'v1',
    path: 'courses',
})
export class CourseController {
    constructor(
        private readonly createCourseUseCase: CreateCourseUseCase,
        private readonly getCoursesUseCase: GetCoursesUseCase,
        private readonly updateCourseUseCase: UpdateCourseUseCase,
        private readonly getCourseByIdUseCase: GetCourseByIdUseCase,
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
        const courses = await this.getCoursesUseCase.execute(
            new GetCoursesFilterDto(
                filter.coachId != null ? new Id(filter.coachId) : undefined,
            ),
        );

        return courses.map(CourseResponseDto.fromEntity);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: CourseResponseDto,
    })
    @ApiOperation({ summary: 'Get course by id' })
    @Get(':id')
    async getById(@Param() { id }: IdParameter): Promise<CourseResponseDto> {
        const course = await this.getCourseByIdUseCase.execute(
            new GetCourseByIdUseCaseDto(new Id(id)),
        );

        return CourseResponseDto.fromEntity(course);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: CourseResponseDto,
    })
    @ApiOperation({ summary: 'Update course' })
    @Patch(':id')
    async update(
        @Param() { id }: IdParameter,
        @Body() dto: UpdateCourseRequestDto,
    ): Promise<CourseResponseDto> {
        const course = await this.updateCourseUseCase.execute(
            new UpdateCourseUseCaseDto(new Id(id), dto),
        );

        return CourseResponseDto.fromEntity(course);
    }
}
