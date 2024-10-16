import { IsString, Length } from 'class-validator';

export class AddPracticeRequestDto {
    @Length(1)
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly url: string;
}
