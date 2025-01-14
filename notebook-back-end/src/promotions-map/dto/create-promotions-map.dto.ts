// src/promotions/dto/create-promotion.dto.ts

import { IsNumber, IsString } from 'class-validator';

export class CreatePromotionsMapDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  discount: number;
}
