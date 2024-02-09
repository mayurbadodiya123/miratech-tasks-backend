import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CoreService } from '../services/core/core.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  coreService = new CoreService();
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { authorization }: any = request.headers;
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException(authorization);
    }
    const authToken = authorization.replace(/bearer/gim, '').trim();
    const isTokenValid = this.coreService.decodeJwtToken(authToken);
    if (!isTokenValid) {
      throw new Error('Invalid Token');
    }
    return true;
  }
}
