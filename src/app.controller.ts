import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { interval, map, Observable } from 'rxjs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { data: string } {
    return this.appService.getHello();
  }

  @Sse('/coin')
  coin(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((value) => ({ data: { hello: `world ${value}` } })),
    );
  }
}
