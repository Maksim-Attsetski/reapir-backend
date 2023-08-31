import { UpdateUserDto } from './update-user.dto';

export class GetUserDto extends UpdateUserDto {
  _id: string;
  createdAt: number;

  constructor(model: GetUserDto) {
    super();

    this._id = model?._id;
    this.createdAt = model?.createdAt;
    this.email = model?.email;
    this.first_name = model?.first_name;
    this.last_name = model?.last_name;
    this.password = model?.password;
    this.phone = model?.phone;
  }
}
