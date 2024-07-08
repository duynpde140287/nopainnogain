/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PapersService } from './papers.service';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RBAC } from 'src/enums/roles.enum';

@Controller('papers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PapersController {
  constructor(private readonly papersService: PapersService) {}

  @Roles(RBAC.PAPERS)
  @Post()
  create(@Body() createPaperDto: CreatePaperDto) {
    return this.papersService.create(createPaperDto);
  }

  @Get()
  findAll() {
    return this.papersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.papersService.findOne(+id);
  }

  @Roles(RBAC.PAPERS)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaperDto: UpdatePaperDto) {
    return this.papersService.update(+id, updatePaperDto);
  }

  @Roles(RBAC.PAPERS)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.papersService.remove(+id);
  }
}
