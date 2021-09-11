import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DiscussionDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  idUser: number;

  @Expose()
  @ApiProperty()
  userFullName: string;

  @Expose()
  @ApiProperty()
  userEmail: string;

  @Expose()
  @ApiProperty()
  comment: string;

  @Expose()
  @ApiProperty()
  link?: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;
}
