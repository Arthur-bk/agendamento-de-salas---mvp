import { IsDateString, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString() roomId: string;
  @IsDateString() startTime: string;
  @IsDateString() endTime: string;
}

