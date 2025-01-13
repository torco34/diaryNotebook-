import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePendingPurchaseDto {
  @IsString()
  @IsNotEmpty()
  item: string;

  @IsBoolean()
  @IsOptional() // Si no es necesario enviar este campo, puedes usar IsOptional
  completed: boolean;

  @IsDateString()
  @IsOptional() // Si no es necesario enviar este campo, puedes usar IsOptional
  createdAt?: string;

  @IsDateString()
  @IsOptional() // Si no es necesario enviar este campo, puedes usar IsOptional
  updatedAt?: string;
}
