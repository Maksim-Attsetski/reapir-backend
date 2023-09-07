import { PartialType } from '@nestjs/mapped-types';
import { CreateCasesDto } from './create-cases.dto';

export class UpdateCasesDto extends PartialType(CreateCasesDto) {}
