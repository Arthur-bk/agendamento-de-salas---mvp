import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt.guard';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private rooms: RoomsService) {}

  @Get()
  list() { return this.rooms.list(); }

  @Post()
  create(@Body() dto: CreateRoomDto) { return this.rooms.create(dto); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoomDto) { return this.rooms.update(id, dto); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.rooms.remove(id); }
}

