import { Type, plainToClass } from 'class-transformer';
import { Course } from '../../../src/domain';
import { IdValidateDto } from './id.validate-dto';
import {
    IsString,
    Length,
    ValidateNested,
    validateSync,
} from 'class-validator';
import { PracticeValidateDto } from './practices.validate-dto';

export class CourseValidateDto {
    @Type(() => IdValidateDto)
    @ValidateNested()
    id: IdValidateDto;

    @Length(1)
    name: string;

    @IsString()
    description: string;

    @Type(() => IdValidateDto)
    @ValidateNested()
    coachId: IdValidateDto;

    @Type(() => PracticeValidateDto)
    @ValidateNested()
    practices: PracticeValidateDto;

    static validate(course: Course) {
        const dto = plainToClass(CourseValidateDto, course);
        const errors = validateSync(dto);
        expect(errors).toHaveLength(0);
    }
}
