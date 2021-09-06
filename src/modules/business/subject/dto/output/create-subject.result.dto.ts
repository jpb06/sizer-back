import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { SubjectDto } from '@business/subject/dto/output/subject.dto';

@Exclude()
export class CreateSubjectResultDto {
  @Expose()
  @ApiProperty()
  @Type(() => SubjectDto)
  data: SubjectDto;
}
