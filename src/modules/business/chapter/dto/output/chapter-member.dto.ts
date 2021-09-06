import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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
  pictureUrl: string;

  @Expose()
  @ApiProperty()
  role: string;
}
