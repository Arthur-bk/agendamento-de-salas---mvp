import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async listByUser(userId: string) {
    return this.prisma.reservation.findMany({ where: { userId }, include: { room: true }, orderBy: { startTime: 'asc' } });
  }

  async create(userId: string, roomId: string, startIso: string, endIso: string) {
    const startTime = new Date(startIso); const endTime = new Date(endIso);
    if (!(startTime < endTime)) throw new BadRequestException('Intervalo inválido');

    const room = await this.prisma.room.findUnique({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Sala não encontrada');

    const overlap = await this.prisma.reservation.findFirst({
      where: {
        roomId,
        OR: [ { startTime: { lt: endTime }, endTime: { gt: startTime } } ],
      },
    });
    if (overlap) throw new BadRequestException('Conflito de horário');

    return this.prisma.reservation.create({ data: { roomId, userId, startTime, endTime } });
  }

  async cancel(userId: string, id: string) {
    const res = await this.prisma.reservation.findUnique({ where: { id } });
    if (!res || res.userId !== userId) throw new NotFoundException('Reserva não encontrada');
    return this.prisma.reservation.delete({ where: { id } });
  }

  async availability(roomId: string, dateISO: string) {
    const day = new Date(dateISO);
    const start = new Date(day); start.setHours(0,0,0,0);
    const end = new Date(day); end.setHours(23,59,59,999);
    const reservations = await this.prisma.reservation.findMany({
      where: { roomId, startTime: { lte: end }, endTime: { gte: start } },
      orderBy: { startTime: 'asc' },
    });
    return { reservations };
  }
}

