import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { setFilters } from '@core-api/utils/set-filters.util';

@Injectable()
export class ParseFilterMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    console.log('NTEs', req.query);
    setFilters(req.query?.filter, 10);
    return next();
  }
}
