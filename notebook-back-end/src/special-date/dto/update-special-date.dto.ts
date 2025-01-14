import { PartialType } from '@nestjs/mapped-types';

import { CreateSpecialDateDto } from './create-special-date.dto';

export class UpdateSpecialDateDto extends PartialType(CreateSpecialDateDto) {}
