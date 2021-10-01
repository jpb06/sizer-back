import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { SubjectsResultDto } from '@business/logged-user/dto/output/subjects.result.dto';
import { SubjectsService } from '@database/services/subjects.service';
import { ApiRoute } from '@decorators/api-route';

import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('chapter')
@ApiTags('Chapters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChapterController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get(':id/subjects')
  @ApiRoute({
    summary: "Chapter's subjects",
    description: "Gets the chapter's subjects",
    ok: {
      type: SubjectsResultDto,
      description: 'The list of subjects',
    },
  })
  async getChaptersSubjects(@Param('id', new ParseIntPipe()) id: number) {
    const subjects = await this.subjectsService.getByChapter(id);

    return plainToClass(SubjectsResultDto, subjects);
  }
}
