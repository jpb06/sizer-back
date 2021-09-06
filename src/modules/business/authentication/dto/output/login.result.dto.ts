import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LoginResultDataDto {
  @Expose()
  @ApiProperty()
  token: string;
}

@Exclude()
export class LoginResultDto {
  @Expose()
  @ApiProperty()
  @Type(() => LoginResultDataDto)
  data: LoginResultDataDto;
}
