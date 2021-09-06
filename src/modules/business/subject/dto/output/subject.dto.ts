import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { ChapterDto } from '../../../chapter/dto/output/chapter.dto';

@Exclude()
export class SubjectDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  details?: string;

  @Expose()
  @ApiProperty()
  link?: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  closedAt: Date;

  @Expose()
  @ApiProperty()
  answer?: string;

  @Expose()
  @ApiProperty()
  @Type(() => ChapterDto)
  chapter: ChapterDto;
}
