import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/api';
import { Config } from 'src/modules';
import errors from 'src/utils/errors';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const splittedAuthHeader = request.headers.authorization?.split(' ');
    console.log(splittedAuthHeader);

    try {
      if (!splittedAuthHeader[1] || splittedAuthHeader[0] !== 'Bearer') {
        throw errors.unauthorized();
      }
      const data = this.jwtService.verify(splittedAuthHeader[1], {
        secret: Config.accessSecret,
      });
      console.log(data);

      if (!data) throw errors.unauthorized();
      request.user = data;

      const userFromDb = await this.usersModel.findById(data?._id);
      console.log(userFromDb);

      if (!userFromDb) throw errors.unauthorized();

      if (userFromDb.role !== 'admin') throw errors.notAccess();
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
