// src/promotions/dto/update-promotion.dto.ts

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePromotionsMapDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsOptional()
  discount?: number;
}
