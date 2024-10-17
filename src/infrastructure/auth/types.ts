import { Expose, Transform, Type, plainToClass } from 'class-transformer';
import { Id } from '../../domain';
import { IsPositive, IsString, ValidateNested } from 'class-validator';

export class IdDto extends Id {
    @Expose({ name: 'id' })
    @IsPositive()
    @Type(() => Number)
    value: number;
}

export class AuthUser {
    @Expose()
    @ValidateNested()
    @Transform(({ obj }) => plainToClass(IdDto, obj))
    id: IdDto;

    @Expose({ name: 'username' })
    @IsString()
    name: string;
}
