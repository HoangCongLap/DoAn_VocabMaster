import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger } from 'src/logger/logger';
import admin from 'src/main';
import * as CONSTANT from '../constants.api';

@Injectable()
export class FirebaseAuthService {
  constructor(private logger: Logger) {}

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    return match[1];
  }
  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);

      this.logger.info(`${JSON.stringify(decodedToken)}`);
      const { email, uid, role } = decodedToken;
      return { email, uid, role };
    } catch (err) {
      this.logger.error(`error while authenticate request ${err.message}`);
      throw new UnauthorizedException(err.message);
    }
  }
}
