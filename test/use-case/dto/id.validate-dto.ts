import { IsPositive } from 'class-validator';
import { Id } from '../../../src/domain';

export class IdValidateDto extends Id {
    @IsPositive()
    value: number;
}
