import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { SubjectsService } from '@database/services/subjects.service';
import { ApiRoute } from '@decorators/api-route';

import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { NewSubjectDto } from './dto/input/new-subject.body.dto';
import { CreateSubjectResultDto } from './dto/output/create-subject.result.dto';

@Controller('subject')
@ApiTags('Chapters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubjectController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @ApiRoute({
    summary: 'Create a subject',
    description: 'Crates a new subject in a chapter',
    ok: {
      type: CreateSubjectResultDto,
      description: 'The created subject',
    },
  })
  @Post()
  async createSubject(@Body() subject: NewSubjectDto) {
    const createdSubject = await this.subjectsService.create(subject);
    return plainToClass(CreateSubjectResultDto, { data: createdSubject });
  }
}
