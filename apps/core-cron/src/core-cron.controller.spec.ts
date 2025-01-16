import { Test, TestingModule } from '@nestjs/testing';
import { CoreCronController } from './core-cron.controller';
import { CoreCronService } from './core-cron.service';

describe('CoreCronController', () => {
  let coreCronController: CoreCronController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoreCronController],
      providers: [CoreCronService],
    }).compile();

    coreCronController = app.get<CoreCronController>(CoreCronController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(coreCronController.getHello()).toBe('Hello World!');
    });
  });
});
