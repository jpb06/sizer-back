import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NewSubjectDto {
  @ApiProperty()
  @IsNumber()
  idChapter: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  details?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  link?: string;
}
