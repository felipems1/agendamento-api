import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MotorcycleModule } from './modules/motorcycle/motorcycle.module';
import { ServiceModule } from './modules/service/service.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [PrismaModule, MotorcycleModule, ServiceModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
