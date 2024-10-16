import { IsString } from 'class-validator';
import { Url } from '../../../src/domain';

export class UrlValidateDto extends Url {
    @IsString()
    value: string;
}
