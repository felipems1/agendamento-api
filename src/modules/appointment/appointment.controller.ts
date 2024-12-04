import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(@Body() data: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(data);
  }

  @Get()
  async getAllAppointment() {
    return this.appointmentService.getAllAppointment();
  }

  @Get(':id')
  async getByIdAppointment(@Param('id') id: string) {
    return this.appointmentService.getByIdAppointment(id);
  }

  @Put(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() data: UpdateAppointmentDto,
  ) {
    return this.appointmentService.updateAppointment(id, data);
  }

  @Delete(':id')
  async removeAppointment(@Param('id') id: string) {
    return this.appointmentService.removeAppointment(id);
  }
}
