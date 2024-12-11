import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsString()
  day?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
