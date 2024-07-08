/* eslint-disable prettier/prettier */
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notifications, PROCESS } from './entities/notification.entity';
import { UsersService } from '../users/users.service';
import { QueryDto } from 'src/dtos/query.dto';
import { escapeRegExp, paginateCalculator } from 'src/utils/page-helper.util';
import { processBody } from './dto/process.dto';
import { User } from '../users/entity/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications.name)
    private readonly notificationModel: Model<Notifications>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async createAlert(alert: string, username: string) {
    const newAlert = await new this.notificationModel({
      alert,
      username,
      process: PROCESS.PENDING,
    });

    return await newAlert.save();
  }

  async getAll({ keyword, page, limit }: QueryDto) {
    const key = keyword
      ? { alert: { $regex: new RegExp(escapeRegExp(keyword), 'i') } }
      : {};

    const { resPerPage, passedPage } = paginateCalculator(page, limit);

    const findAll = await this.notificationModel
      .find({ ...key })
      .sort({ createAt: -1 })
      .limit(resPerPage)
      .skip(passedPage)
      .lean()
      .exec();

    return findAll;
  }

  async activeNoti(
    id: Types.ObjectId,
    { process }: processBody,
  ): Promise<string> {
    const findbyId: Notifications = await this.notificationModel
      .findById(id)
      .lean()
      .exec();
    if (!findbyId) {
      throw new ConflictException('Không tìm thấy ID tương ứng!');
    }

    const actived: boolean = process === PROCESS.ACCEPTED ? true : false;
    const doneActive: User = await this.userService.activeUser(
      findbyId?.username,
      actived,
    );

    await this.notificationModel.findByIdAndUpdate(
      id,
      { process },
      { new: true },
    );

    return doneActive?.is_active === true
      ? `Đã xét duyệt tài khoản ${doneActive?.username}`
      : `Đã vô hiệu hóa tài khoản ${doneActive?.username}`;
  }
}
