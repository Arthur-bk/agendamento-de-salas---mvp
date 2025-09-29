import { PrismaService } from '../prisma/prisma.service';
export declare class ReservationsService {
    private prisma;
    constructor(prisma: PrismaService);
    listByUser(userId: string): Promise<({
        room: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            capacity: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        userId: string;
        startTime: Date;
        endTime: Date;
    })[]>;
    create(userId: string, roomId: string, startIso: string, endIso: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        userId: string;
        startTime: Date;
        endTime: Date;
    }>;
    cancel(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        userId: string;
        startTime: Date;
        endTime: Date;
    }>;
    availability(roomId: string, dateISO: string): Promise<{
        reservations: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomId: string;
            userId: string;
            startTime: Date;
            endTime: Date;
        }[];
    }>;
}
