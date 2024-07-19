import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class IdParameter {
    @IsPositive()
    @Type(() => Number)
    id: number;
}
