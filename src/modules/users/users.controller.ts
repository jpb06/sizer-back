import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@decorators/api-route';
import { ChaptersService } from '@modules/chapters/chapters.service';
import { ChapterDto } from '@modules/chapters/dto/chapter.dto';
import { JwtAuthGuard } from '@modules/jwt/guards/jwt-auth.guard';

@Controller('authentication')
@ApiTags('user')
export class UsersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get(':id/chapters')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiRoute({
    summary: 'User chapters',
    description: 'Gets the chapters of an user',
    ok: { type: [ChapterDto], description: 'The chapters' },
  })
  async getUserChapters(
    @Param('id', new ParseIntPipe()) idUser: number,
  ): Promise<Array<ChapterDto>> {
    return this.chaptersService.getBy(idUser);
  }
}
