import { Type } from 'class-transformer';
import { IdValidateDto } from './id.validate-dto';
import { IsString, Length, ValidateNested } from 'class-validator';
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
