import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { isEqual, startOfDay } from 'date-fns';

@Injectable()
export class AppointmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAppointment(data: CreateAppointmentDto) {
    const formatDate = startOfDay(new Date(data.date));

    const appointments = await this.prismaService.appointment.findMany();

    const IsAlreadyAppointment = appointments.some((appointment) =>
      isEqual(startOfDay(appointment.date), formatDate),
    );

    if (IsAlreadyAppointment) {
      throw new BadRequestException(
        'An appointment already exists for this date.',
      );
    }

    const existingMotorcycle = await this.prismaService.motorcycle.findUnique({
      where: { id: data.motorcycleId },
    });

    if (!existingMotorcycle) {
      throw new NotFoundException(
        `Motorcycle with ID ${data.motorcycleId} not found.`,
      );
    }

    const existingService = await this.prismaService.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!existingService) {
      throw new NotFoundException(
        `Service with ID ${data.serviceId} not found.`,
      );
    }

    return this.prismaService.appointment.create({ data });
  }

  async getAllAppointment() {
    return this.prismaService.appointment.findMany({
      include: {
        motorcycle: true,
        service: true,
      },
    });
  }

  async getByIdAppointment(id: string) {
    return this.prismaService.appointment.findUnique({
      where: { id },
    });
  }

  async updateAppointment(id: string, data: UpdateAppointmentDto) {
    const existingAppointment = await this.prismaService.appointment.findUnique(
      {
        where: { id },
      },
    );

    if (!existingAppointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found.`);
    }

    return this.prismaService.appointment.update({
      where: { id },
      data,
    });
  }

  async removeAppointment(id: string) {
    const existingAppointment = await this.prismaService.appointment.findUnique(
      {
        where: { id },
      },
    );

    if (!existingAppointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found.`);
    }

    return this.prismaService.appointment.delete({
      where: {
        id,
      },
    });
  }
}
