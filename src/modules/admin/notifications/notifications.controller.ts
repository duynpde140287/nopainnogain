/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { QueryDto } from 'src/dtos/query.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RBAC } from 'src/enums/roles.enum';
import { Types } from 'mongoose';
import { processBody } from './dto/process.dto';

@Controller('/notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/all')
  @Roles(RBAC.ADMIN)
  async findAllNoti(@Query() query: QueryDto) {
    return await this.notificationsService.getAll(query);
  }

  @Patch('/active/:id')
  @Roles(RBAC.ADMIN)
  async activeInformation(
    @Param('id') id: Types.ObjectId,
    @Body() body: processBody,
  ) {
    return await this.notificationsService.activeNoti(id, body);
  }
}
