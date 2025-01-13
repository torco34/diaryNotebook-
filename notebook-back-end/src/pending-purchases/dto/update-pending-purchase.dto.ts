import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdatePendingPurchaseDto {
  @IsString()
  @IsOptional()
  item?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}
