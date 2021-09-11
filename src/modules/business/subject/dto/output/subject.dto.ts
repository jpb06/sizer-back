import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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
  chapterId: number;

  @Expose()
  @ApiProperty()
  chapterName: string;
}
