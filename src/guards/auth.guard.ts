import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { Config } from 'src/modules';
import errors from 'src/utils/errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const splittedAuthHeader = request.headers.authorization?.split(' ');

    try {
      if (!splittedAuthHeader[1] || splittedAuthHeader[0] !== 'Bearer') {
        throw errors.unauthorized();
      }
      const data = this.jwtService.verify(splittedAuthHeader[1], {
        secret: Config.accessSecret,
      });
      request.user = data;
      return true;
    } catch (error) {
      console.error(error);

      throw errors.unauthorized();
    }
  }
}
