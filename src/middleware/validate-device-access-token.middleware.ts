import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PiService } from '../pi/pi.service';

@Injectable()
export class ValidateDeviceAccessTokenMiddleware implements NestMiddleware {
  constructor(private readonly piService: PiService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['access-token'] as string;

    if (!accessToken) {
      return res.status(403).json({ message: 'Access token is required' });
    }

    const device = await this.piService.validateAccessToken(accessToken);

    console.log('Device:', device);

    if (!device) {
      return res
        .status(403)
        .json({ message: 'Invalid or expired access token' });
    }

    next();
  }
}
