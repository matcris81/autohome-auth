import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PiService } from '../pi/pi.service';
import { AppService } from 'src/app.service';

@Injectable()
export class ValidateDeviceAccessTokenMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/registerDevice') {
      next();
      return;
    }

    const accessToken = req.headers['access-token'] as string;

    if (!accessToken) {
      return res.status(403).json({ message: 'Access token is required' });
    }

    const device = await this.appService.validateAccessToken(accessToken);

    console.log('Device:', device);

    if (!device) {
      return res
        .status(403)
        .json({ message: 'Invalid or expired access token' });
    }

    next();
  }
}
