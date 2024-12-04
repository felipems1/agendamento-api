import { Body, Controller, Get, Post } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { createMotorcycleDto } from './dtos/create-motorcycle.dto';

@Controller('motorcycle')
export class MotorcycleController {
  constructor(private readonly motorcycleService: MotorcycleService) {}

  @Post()
  createMotorcycle(@Body() data: createMotorcycleDto) {
    return this.motorcycleService.createMotorcycle(data);
  }

  @Get()
  getAllMotorcycles() {
    return this.motorcycleService.getAllMotorcycles();
  }
}
