// src/termek/dto/create-termek.dto.ts
import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateTermekDto {
  @IsString()
  @IsNotEmpty()
  nev: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  ar: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  raktariDarabszam: number;

  @IsString()
  @IsNotEmpty()
  szin: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  ertekeles: number;

  @IsInt()
  @IsNotEmpty()
  kiadasEve: number;

  @IsBoolean()
  @IsNotEmpty()
  publikalt: boolean;
}