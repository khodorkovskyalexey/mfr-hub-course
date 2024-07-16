import { Body, Controller, Post } from '@nestjs/common';
import {
    CreateCourseUseCaseDto,
    CreateCourseUseCase,
} from '../../../application/use-case';
import { CreateCourseRequestDto } from './dto';
import { Id } from '../../../domain';
import { CourseResponseDto } from './dto/course.response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller({
    version: 'v1',
    path: 'courses',
})
export class CourseController {
    constructor(private readonly createCourseUseCase: CreateCourseUseCase) {}

    @ApiOperation({ summary: 'Create course' })
    @Post()
    async create(
        @Body() { name, description, coachId }: CreateCourseRequestDto,
    ): Promise<CourseResponseDto> {
        const course = await this.createCourseUseCase.execute(
            new CreateCourseUseCaseDto(
                name,
                description,
                new Id(coachId),
            ),
        );

        return CourseResponseDto.fromEntity(course);
    }
}
