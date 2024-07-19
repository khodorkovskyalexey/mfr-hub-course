import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCourseRequestDto {
    @IsOptional()
    @Length(1)
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;
}
