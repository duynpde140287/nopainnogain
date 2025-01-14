/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePaperDto, UpdatePaperDto } from './dto/paper.dto';

@Injectable()
export class PapersService {
  create(createPaperDto: CreatePaperDto) {
    return 'This action adds a new paper';
  }

  findAll() {
    return `This action returns all papers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paper`;
  }

  update(id: number, updatePaperDto: UpdatePaperDto) {
    return `This action updates a #${id} paper`;
  }

  remove(id: number) {
    return `This action removes a #${id} paper`;
  }
}
