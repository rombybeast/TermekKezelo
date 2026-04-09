// src/termek/termek.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TermekService } from './termek.service';
import { CreateTermekDto } from './dto/create-termek.dto';
import { UpdateTermekDto } from './dto/update-termek.dto';

@Controller('termek')
export class TermekController {
  constructor(private readonly termekService: TermekService) {}

  @Post()
  create(@Body() createTermekDto: CreateTermekDto) {
    return this.termekService.create(createTermekDto);
  }

  @Get()
  findAll() {
    return this.termekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.termekService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTermekDto: UpdateTermekDto) {
    return this.termekService.update(id, updateTermekDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.termekService.remove(id);
  }

 
  @Patch(':id/increment')
  increment(@Param('id', ParseIntPipe) id: number) {
    return this.termekService.changeStock(id, 1);
  }

  
  @Patch(':id/decrement')
  decrement(@Param('id', ParseIntPipe) id: number) {
    return this.termekService.changeStock(id, -1);
  }

  
  @Patch(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number) {
    return this.termekService.setPublished(id, true);
  }

  
  @Patch(':id/unpublish')
  unpublish(@Param('id', ParseIntPipe) id: number) {
    return this.termekService.setPublished(id, false);
  }
}