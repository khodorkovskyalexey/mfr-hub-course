import { Course } from '../../../../domain';

export class CourseResponseDto {
    id: number;

    name: string;

    description: string;

    coachId: number;

    static fromEntity(entity: Course): CourseResponseDto {
        const course = new CourseResponseDto();
        course.id = entity.id.value;
        course.name = entity.name;
        course.description = entity.description;
        course.coachId = entity.coachId.value;

        return course;
    }
}
