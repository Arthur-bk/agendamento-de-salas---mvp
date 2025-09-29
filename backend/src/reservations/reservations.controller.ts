import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt.guard';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/reservation.dto';

@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private reservations: ReservationsService) {}

  @Get()
  list(@Req() req: any) {
    return this.reservations.listByUser(req.user.userId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateReservationDto) {
    return this.reservations.create(req.user.userId, dto.roomId, dto.startTime, dto.endTime);
  }

  @Delete(':id')
  cancel(@Req() req: any, @Param('id') id: string) {
    return this.reservations.cancel(req.user.userId, id);
  }

  @Get('availability')
  availability(@Query('roomId') roomId: string, @Query('date') date: string) {
    return this.reservations.availability(roomId, date);
  }
}

