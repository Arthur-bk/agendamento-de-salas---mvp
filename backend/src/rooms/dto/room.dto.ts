import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsString() @MinLength(2) name: string;
  @IsInt() @IsPositive() capacity: number;
}

export class UpdateRoomDto {
  @IsOptional() @IsString() @MinLength(2) name?: string;
  @IsOptional() @IsInt() @IsPositive() capacity?: number;
}

