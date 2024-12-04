import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  motorcycleId: string;
}
