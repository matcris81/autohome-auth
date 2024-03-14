import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PiService } from './pi.service';

@Controller('pi')
export class PiController {
  constructor(private readonly piService: PiService) {}
}
