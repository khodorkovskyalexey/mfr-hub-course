import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class GetCoursesFilterRequestDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    readonly coachId?: number;
}
