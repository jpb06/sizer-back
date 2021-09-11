import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ChapterMemberDto {
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
  userPictureUrl: string;

  @Expose()
  @ApiProperty()
  role: string;
}
