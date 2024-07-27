import { Expose, Transform, plainToClass } from 'class-transformer';
import { Id } from '../../domain';
import { IsPositive, IsString, ValidateNested } from 'class-validator';

export class IdDto extends Id {
    @Expose()
    @IsPositive()
    id: number;
}

export class AuthUser {
    @Expose()
    @ValidateNested()
    @Transform(({ obj }) =>
        plainToClass(IdDto, obj, { excludeExtraneousValues: true }),
    )
    id: IdDto;

    @Expose({ name: 'username' })
    @IsString()
    name: string;
}
