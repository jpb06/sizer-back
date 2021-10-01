import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { TerseUserDto } from '@business/logged-user/dto/output/terse-user.dto';

@Exclude()
export class DiscussionDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  comment: string;

  @Expose()
  @ApiProperty()
  link?: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  user: TerseUserDto;
}
