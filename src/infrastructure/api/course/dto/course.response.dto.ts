import { Course } from '../../../../domain';

export class CourseResponseDto {
    id: number;

    name: string;

    description: string;

    coachId: number;

    static fromEntity(entity: Course): CourseResponseDto {
        const { id, name, description, coachId } = entity.unpack();

        const course = new CourseResponseDto();
        course.id = id.value;
        course.name = name;
        course.description = description;
        course.coachId = coachId.value;

        return course;
    }
}
