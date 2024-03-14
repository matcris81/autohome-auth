import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pi } from './entities/pi.entity';
import { UpdatePiDto } from './dto/update-pi.dto';
import { CreatePiDto } from './dto/create-pi.dto';

@Injectable()
export class PiService {
  constructor(
    @InjectRepository(Pi)
    private piRepository: Repository<Pi>,
  ) {}

  create(createPiDto: CreatePiDto): Promise<Pi> {
    const pi = this.piRepository.create(createPiDto);
    return this.piRepository.save(pi);
  }

  findAll(): Promise<Pi[]> {
    return this.piRepository.find();
  }

  findOne(id: string): Promise<Pi> {
    return this.piRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updatePiDto: UpdatePiDto): Promise<Pi> {
    const pi = await this.findOne(id); // Ensure existence
    this.piRepository.merge(pi, updatePiDto);
    return this.piRepository.save(pi);
  }

  async remove(id: string): Promise<void> {
    await this.piRepository.delete(id);
  }
}
