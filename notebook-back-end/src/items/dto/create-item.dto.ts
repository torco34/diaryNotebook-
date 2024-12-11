import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';
export class CreateItemDto {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsString()
  day: string;

  @IsDate()
  @Type(() => Date)
  date: Date;
  // Este campo es opcional, ya que tiene un valor predeterminado en Prisma
}
