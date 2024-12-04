import { IsNotEmpty, IsString } from 'class-validator';

export class createMotorcycleDto {
  @IsString()
  @IsNotEmpty()
  model: string;
}
