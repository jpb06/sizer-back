import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { DiscussionDto } from '@business/discussion/dto/output/discussion.dto';
import { SubjectDto } from '@business/subject/dto/output/subject.dto';

@Exclude()
export class SubjectWithDiscussionsDto extends SubjectDto {
  @Expose()
  @ApiProperty({ isArray: true, type: DiscussionDto })
  @Type(() => DiscussionDto)
  discussion: Array<DiscussionDto>;
}

@Exclude()
export class SubjectsResultDto {
  @Expose()
  @ApiProperty({ isArray: true, type: SubjectWithDiscussionsDto })
  @Type(() => SubjectWithDiscussionsDto)
  data: Array<SubjectWithDiscussionsDto>;
}
