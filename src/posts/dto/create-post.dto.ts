import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateUserDto)
  readonly user: CreateUserDto;
}
