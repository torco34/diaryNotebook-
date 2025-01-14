import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateSpecialDateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsBoolean()
  notify: boolean;
}
