import { Test, TestingModule } from '@nestjs/testing';
import { PiServerGateway } from './pi-server.gateway';

describe('PiServerGateway', () => {
  let gateway: PiServerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiServerGateway],
    }).compile();

    gateway = module.get<PiServerGateway>(PiServerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
