import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsLocale, IsNumber, IsString, IsUrl } from 'class-validator';

@Exclude()
export class JwtPayloadDto {
  @Expose()
  @IsNumber()
  @ApiProperty()
  id: number;

  @Expose()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Expose()
  @IsString()
  @ApiProperty()
  fullName: string;

  @Expose()
  @IsUrl()
  @ApiProperty()
  pictureUrl: string;

  @Expose()
  @IsLocale()
  @ApiProperty()
  locale: string;

  @Expose()
  @IsNumber()
  @ApiProperty()
  exp: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  iat: number;
}
