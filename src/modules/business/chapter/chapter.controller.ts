import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ChaptersSubjectsResultDto } from '@business/logged-user/dto/output/chapters-subjects.result.dto';
import { ChaptersSubjectsService } from '@database/services/chapters-subjects.service';
import { ApiRoute } from '@decorators/api-route';

import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('chapter')
@ApiTags('Chapters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChapterController {
  constructor(
    private readonly chaptersSubjectsService: ChaptersSubjectsService,
  ) {}

  @Get(':id/subjects')
  @ApiRoute({
    summary: "Chapter's subjects",
    description: "Gets the chapter's subjects",
    ok: {
      type: ChaptersSubjectsResultDto,
      description: 'The list of subjects',
    },
  })
  async getChaptersSubjects(@Param('id', new ParseIntPipe()) id: number) {
    const subjects = await this.chaptersSubjectsService.getByChapter(id);
    return plainToClass(ChaptersSubjectsResultDto, { data: subjects });
  }
}
