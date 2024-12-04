import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { createMotorcycleDto } from './dtos/create-motorcycle.dto';

@Injectable()
export class MotorcycleService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMotorcycle(data: createMotorcycleDto) {
    const existingMotorcycle = await this.prismaService.motorcycle.findUnique({
      where: { model: data.model },
    });

    if (existingMotorcycle) {
      throw new ConflictException();
    }

    return this.prismaService.motorcycle.create({
      data: { model: data.model },
    });
  }

  async getAllMotorcycles() {
    return this.prismaService.motorcycle.findMany();
  }
}
