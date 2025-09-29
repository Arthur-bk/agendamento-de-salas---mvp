"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReservationsService = class ReservationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listByUser(userId) {
        return this.prisma.reservation.findMany({ where: { userId }, include: { room: true }, orderBy: { startTime: 'asc' } });
    }
    async create(userId, roomId, startIso, endIso) {
        const startTime = new Date(startIso);
        const endTime = new Date(endIso);
        if (!(startTime < endTime))
            throw new common_1.BadRequestException('Intervalo inválido');
        const room = await this.prisma.room.findUnique({ where: { id: roomId } });
        if (!room)
            throw new common_1.NotFoundException('Sala não encontrada');
        const overlap = await this.prisma.reservation.findFirst({
            where: {
                roomId,
                OR: [{ startTime: { lt: endTime }, endTime: { gt: startTime } }],
            },
        });
        if (overlap)
            throw new common_1.BadRequestException('Conflito de horário');
        return this.prisma.reservation.create({ data: { roomId, userId, startTime, endTime } });
    }
    async cancel(userId, id) {
        const res = await this.prisma.reservation.findUnique({ where: { id } });
        if (!res || res.userId !== userId)
            throw new common_1.NotFoundException('Reserva não encontrada');
        return this.prisma.reservation.delete({ where: { id } });
    }
    async availability(roomId, dateISO) {
        const day = new Date(dateISO);
        const start = new Date(day);
        start.setHours(0, 0, 0, 0);
        const end = new Date(day);
        end.setHours(23, 59, 59, 999);
        const reservations = await this.prisma.reservation.findMany({
            where: { roomId, startTime: { lte: end }, endTime: { gte: start } },
            orderBy: { startTime: 'asc' },
        });
        return { reservations };
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map