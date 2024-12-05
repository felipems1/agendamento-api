import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async createService(data: CreateServiceDto) {
    const existingMotorcycleId = await this.prismaService.motorcycle.findUnique(
      {
        where: { id: data.motorcycleId },
      },
    );

    if (!existingMotorcycleId) {
      throw new NotFoundException(
        `Motorcycle with ID ${data.motorcycleId} not found.`,
      );
    }

    return this.prismaService.service.create({
      data,
    });
  }

  async getAllServices() {
    return this.prismaService.service.findMany();
  }

  async updateService(id: string, data: UpdateServiceDto) {
    const existingServiceId = await this.prismaService.service.findUnique({
      where: { id },
    });

    if (!existingServiceId) {
      throw new NotFoundException(`service with ID ${id} not found.`);
    }

    return this.prismaService.service.update({
      where: { id },
      data: data,
    });
  }

  async removeService(id: string) {
    const existingServiceId = await this.prismaService.service.findUnique({
      where: { id },
    });

    if (!existingServiceId) {
      throw new NotFoundException(`service with ID ${id} not found.`);
    }

    return this.prismaService.service.delete({
      where: { id },
    });
  }

  async getServiceById(id: string) {
    const existingServiceId = await this.prismaService.service.findUnique({
      where: { id },
    });

    if (!existingServiceId) {
      throw new NotFoundException(`service with ID ${id} not found.`);
    }

    return this.prismaService.service.findUnique({
      where: { id },
    });
  }

  async getPriceForServiceAndMotorcycle(
    motorcycleId: string,
    serviceId: string,
  ): Promise<number> {
    const existingMotorcycleId = await this.prismaService.motorcycle.findUnique(
      {
        where: { id: motorcycleId },
      },
    );

    if (!existingMotorcycleId) {
      throw new NotFoundException(
        `Motorcycle with ID ${motorcycleId} not found.`,
      );
    }

    const service = await this.prismaService.service.findFirst({
      where: {
        motorcycleId: motorcycleId,
        id: serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not available for this motorcycle');
    }

    return service.price;
  }

  async getServicesByMotorcycleId(motorcycleId: string) {
    const services = await this.prismaService.service.findMany({
      where: { motorcycleId },
    });

    if (services.length === 0) {
      throw new NotFoundException(
        'No services found for the selected motorcycle',
      );
    }

    return services;
  }
}
