import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CoreService } from 'src/core/services/core/core.service';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private coreService: CoreService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    const authToken = authorization.replace(/bearer/gim, '').trim();
    const userData = this.coreService.decodeJwtToken(authToken);
    request.body['employee_id'] = userData.employee_id;
    return next.handle();
  }
}
