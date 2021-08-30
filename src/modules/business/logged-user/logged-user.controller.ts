import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggedUserRequest } from '@business/authentication/types/logged-user-request.interface';
import { ChapterWithMembersDto } from '@database/dto/chapter-with-members.dto';
import { ChaptersService } from '@database/services/chapters.service';
import { ApiRoute } from '@decorators/api-route';

import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('logged-user')
@ApiTags('Logged users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LoggedUserController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get('chapters')
  @ApiRoute({
    summary: "Logged user's chapters",
    description: 'Gets the chapters the logged user belongs to',
    ok: {
      type: [ChapterWithMembersDto],
      description: 'The list of chapters, along with their members',
    },
  })
  async getChaptersWithMembers(
    @Request() { loggedUser }: LoggedUserRequest,
  ): Promise<Array<ChapterWithMembersDto>> {
    return this.chaptersService.getBy(loggedUser.id);
  }
}
