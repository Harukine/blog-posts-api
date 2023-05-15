import { PostEntity } from '../../posts/entities/post.entity';

export class UserEntity {
  id: number;
  name: string;
}

export class UserWithPostsEntity {
  id: number;
  name: string;

  posts: PostEntity[];
}
