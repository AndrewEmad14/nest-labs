import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isoString = new Date().toISOString();
    console.log('Request...');
    console.log(req.body);
    console.log(isoString); 
    next();
  }
}
