import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import { FirebaseAuthService } from '../services/firebase.service';
import { ConfigService } from 'src/config/config.service';
export interface RequestModel extends Request {
  user: { email: string; uid: string; role: string };
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly firebaseService: FirebaseAuthService,
    private readonly configService: ConfigService,
  ) {}

  public async use(req: RequestModel, _: Response, next: NextFunction) {
    try {
      if (this.configService.get().env === 'development') {
        req.user = {
          uid: 'KEIj1HaI06a4QKOwO7UPBYBCuxw2',
          email: 'nhatnam10a3@gmail.com',
          role: '',
        };
      } else {
        const { authorization } = req.headers;
        console.log('authorization', authorization);
        if (!authorization) {
          console.log('missing authz header');
          throw new HttpException(
            { message: 'missing authz header' },
            HttpStatus.BAD_REQUEST,
          );
        }
        const user = await this.firebaseService.authenticate(authorization);
        req.user = user;
      }

      next();
    } catch (err) {
      throw new HttpException(
        { message: 'invalid token' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
