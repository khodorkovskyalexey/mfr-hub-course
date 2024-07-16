import { Course } from '../../../../domain';

export class CourseResponseDto {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly coachId: number,
    ) {}

    static fromEntity(course: Course): CourseResponseDto {
        return new CourseResponseDto(
            course.id.value,
            course.name,
            course.description,
            course.coachId.value,
        );
    }
}
