import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.room.findMany({ orderBy: { name: 'asc' } });
  }

  async create(dto: CreateRoomDto) {
    try {
      return await this.prisma.room.create({ data: dto });
    } catch (e) {
      throw new BadRequestException('Sala já existe');
    }
  }

  async update(id: string, dto: UpdateRoomDto) {
    const exists = await this.prisma.room.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Sala não encontrada');
    return this.prisma.room.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.prisma.room.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Sala não encontrada');
    return this.prisma.room.delete({ where: { id } });
  }
}

