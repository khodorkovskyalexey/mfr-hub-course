import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import {
    AddPracticeUseCase,
    AddPracticeUseCaseDto,
} from '../../../application/use-case';
import { AddPracticeRequestDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Id, Url } from '../../../domain';
import { IAM, IdParameter, SuccessResponseDto } from '../common';
import { AuthUser } from '../../auth/types';

@ApiTags('Practice')
@Controller({
    version: 'v1',
    path: 'courses/:id/practices',
})
export class PracticeController {
    constructor(private readonly addPracticeUseCase: AddPracticeUseCase) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        type: SuccessResponseDto,
    })
    @ApiOperation({ summary: 'Add practice to course' })
    @Post()
    async create(
        @Param() { id: courseId }: IdParameter,
        @IAM() { id: iamId }: AuthUser,
        @Body() body: AddPracticeRequestDto,
    ): Promise<SuccessResponseDto> {
        await this.addPracticeUseCase.execute(
            new AddPracticeUseCaseDto(
                new Id(courseId),
                iamId,
                body.name,
                body.description,
                new Url(body.url),
            ),
        );

        return new SuccessResponseDto();
    }
}
