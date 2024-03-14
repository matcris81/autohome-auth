import { IsString } from 'class-validator';

export class CreatePiDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
