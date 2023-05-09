import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
