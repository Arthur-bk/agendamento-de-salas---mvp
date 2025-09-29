import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';
export declare class RoomsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        capacity: number;
    }[]>;
    create(dto: CreateRoomDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        capacity: number;
    }>;
    update(id: string, dto: UpdateRoomDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        capacity: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        capacity: number;
    }>;
}
