import { IsOptional, IsString, IsDateString, IsUUID } from 'class-validator';

export class UpdateAppointmentDto {
  @IsString()
  @IsOptional()
  customerName?: string;

  @IsString()
  @IsOptional()
  customerContact?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsUUID()
  @IsOptional()
  motorcycleId?: string;

  @IsUUID()
  @IsOptional()
  serviceId?: string;
}
