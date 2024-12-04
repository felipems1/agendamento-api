import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  motorcycleId?: string;
}
