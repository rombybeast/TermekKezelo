// src/termek/termek.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTermekDto } from './dto/create-termek.dto';
import { UpdateTermekDto } from './dto/update-termek.dto';

@Injectable()
export class TermekService {
  constructor(private prisma: PrismaService) {}

  async create(createTermekDto: CreateTermekDto) {
    return this.prisma.termek.create({ data: createTermekDto });
  }

  async findAll() {
    return this.prisma.termek.findMany();
  }

  async findOne(id: number) {
    return this.prisma.termek.findUnique({ where: { id } });
  }

  async update(id: number, updateTermekDto: UpdateTermekDto) {
    return this.prisma.termek.update({
      where: { id },
      data: updateTermekDto,
    });
  }

  async remove(id: number) {
    return this.prisma.termek.delete({ where: { id } });
  }

  async changeStock(id: number, amount: number) {
    return this.prisma.termek.update({
      where: { id },
      data: { raktariDarabszam: { increment: amount } },
    });
  }

  async setPublished(id: number, status: boolean) {
    return this.prisma.termek.update({
      where: { id },
      data: { publikalt: status },
    });
  }
}