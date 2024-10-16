import { Type, plainToClass } from 'class-transformer';
import { Practice } from '../../../src/domain';
import { IdValidateDto } from './id.validate-dto';
import {
    IsString,
    Length,
    ValidateNested,
    validateSync,
} from 'class-validator';
import { UrlValidateDto } from './url.validate-dto';

export class PracticeValidateDto {
    @Type(() => IdValidateDto)
    @ValidateNested()
    id: IdValidateDto;

    @Length(1)
    name: string;

    @IsString()
    description: string;

    @Type(() => UrlValidateDto)
    @ValidateNested()
    url: UrlValidateDto;
}
