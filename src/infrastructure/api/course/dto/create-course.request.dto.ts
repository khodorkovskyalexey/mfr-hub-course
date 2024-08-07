import { IsPositive, IsString, Length } from 'class-validator';

export class CreateCourseRequestDto {
    @Length(1)
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsPositive()
    readonly coachId: number;
}
