import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async createService(@Body() data: CreateServiceDto) {
    return this.serviceService.createService(data);
  }

  @Get()
  async getAllServices() {
    return this.serviceService.getAllServices();
  }

  @Get(':id')
  async getServiceById(@Param('id') id: string) {
    return this.serviceService.getServiceById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateServiceDto) {
    return this.serviceService.updateService(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serviceService.removeService(id);
  }
}
