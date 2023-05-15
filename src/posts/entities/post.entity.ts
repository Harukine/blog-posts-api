import { UserEntity } from '../../users/entities/user.entity';

export class PostEntity {
  id: number;
  content: string;
}

export class PostWithUserEntity {
  id: number;
  content: string;

  user: UserEntity;
}
