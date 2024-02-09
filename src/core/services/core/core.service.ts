import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CoreService {
  private jwtService = new JwtService();

  async createJwtToken(data): Promise<string> {
    return this.jwtService.signAsync(data);
  }
  decodeJwtToken(token: string) {
    return this.jwtService.decode(token);
  }
  async verifyJwtToken(token: string) {
    return this.jwtService.verifyAsync(token, { secret: 'secret' });
  }
}
