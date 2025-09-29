import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/reservation.dto';
export declare class ReservationsController {
    private reservations;
    constructor(reservations: ReservationsService);
    list(req: any): Promise<({
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
    create(req: any, dto: CreateReservationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        userId: string;
        startTime: Date;
        endTime: Date;
    }>;
    cancel(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        userId: string;
        startTime: Date;
        endTime: Date;
    }>;
    availability(roomId: string, date: string): Promise<{
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
