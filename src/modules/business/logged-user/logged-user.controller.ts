import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { LoggedUserRequest } from '@business/authentication/types/logged-user-request.interface';
import { ChaptersSubjectsService } from '@database/services/chapters-subjects.service';
import { ChaptersService } from '@database/services/chapters.service';
import { ApiRoute } from '@decorators/api-route';

import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { ChaptersSubjectsResultDto } from './dto/output/chapters-subjects.result.dto';
import { ChaptersWithMembersResultDto } from './dto/output/chapters-with-members.result.dto';

@Controller('logged-user')
@ApiTags('Logged users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LoggedUserController {
  constructor(
    private readonly chaptersService: ChaptersService,
    private readonly chaptersSubjectsService: ChaptersSubjectsService,
  ) {}

  @Get('chapters')
  @ApiRoute({
    summary: "Logged user's chapters",
    description: 'Gets the chapters the logged user belongs to',
    ok: {
      type: ChaptersWithMembersResultDto,
      description: 'The list of chapters, along with their members',
    },
  })
  async getChaptersWithMembers(
    @Request() { loggedUser: { id } }: LoggedUserRequest,
  ) {
    const chapters = await this.chaptersService.getBy(id);
    return plainToClass(ChaptersWithMembersResultDto, { data: chapters });
  }

  @Get('subjects')
  @ApiRoute({
    summary: "Logged user's subjects",
    description: 'Gets the subjects this user has access to',
    ok: {
      type: ChaptersSubjectsResultDto,
      description: 'The list of subjects',
    },
  })
  async getSubjects(@Request() { loggedUser: { id } }: LoggedUserRequest) {
    const subjects = await this.chaptersSubjectsService.getByChapter(id);
    return plainToClass(ChaptersSubjectsResultDto, { data: subjects });
  }
}
