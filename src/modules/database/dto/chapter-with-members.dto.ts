import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { ChapterDto } from './chapter.dto';

@Exclude()
export class ChapterMemberDto {
  @Expose()
  @ApiProperty()
  idUser: number;

  @Expose()
  @ApiProperty()
  fullName: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  role: string;
}

@Exclude()
export class ChapterWithMembersDto extends ChapterDto {
  @Expose()
  @Type(() => ChapterMemberDto)
  @ApiProperty()
  members: Array<ChapterMemberDto>;
}
