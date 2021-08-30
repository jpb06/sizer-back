import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { ChapterDto } from '@database/dto/chapter.dto';

@Exclude()
export class UserChapterDto extends ChapterDto {
  @Expose()
  @ApiProperty()
  role: string;
}
