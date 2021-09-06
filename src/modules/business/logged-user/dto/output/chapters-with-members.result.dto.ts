import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { ChapterMemberDto } from '@business/chapter/dto/output/chapter-member.dto';
import { ChapterDto } from '@business/chapter/dto/output/chapter.dto';

@Exclude()
export class ChapterWithMembersDto extends ChapterDto {
  @Expose()
  @ApiProperty({ isArray: true, type: ChapterMemberDto })
  @Type(() => ChapterMemberDto)
  members: Array<ChapterMemberDto>;
}

@Exclude()
export class ChaptersWithMembersResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: ChapterWithMembersDto })
  @Type(() => ChapterWithMembersDto)
  data: Array<ChapterWithMembersDto>;
}
