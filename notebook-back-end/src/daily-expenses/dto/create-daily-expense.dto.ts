import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDailyExpenseDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @Transform(({ value }) => new Date(value)) // Convierte la fecha recibida en formato ISO 8601 a un objeto Date
  @IsDate()
  date: Date;

  @IsString()
  dayOfWeek: string;
}
