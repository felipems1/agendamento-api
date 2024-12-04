import { Module } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleController } from './motorcycle.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MotorcycleService],
  controllers: [MotorcycleController],
  imports: [PrismaModule],
})
export class MotorcycleModule {}
