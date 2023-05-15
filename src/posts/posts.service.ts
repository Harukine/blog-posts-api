import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

const createPostValidator = (content: string, id: number, name: string) => {
  const user = {
    id,
    name,
  };
  return Prisma.validator<Prisma.PostCreateInput>()({
    content,
    user: {
      connectOrCreate: {
        where: { id: user.id },
        create: user,
      },
    },
  });
};

const selectPostValidator = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  content: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
});

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    const { content, user } = createPostDto;
    return this.prisma.post.create({
      data: createPostValidator(content, user.id, user.name),
      select: selectPostValidator,
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      select: selectPostValidator,
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      select: selectPostValidator,
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const { content, user } = updatePostDto;
    return this.prisma.post.update({
      where: { id },
      data: createPostValidator(content, user.id, user.name),
      select: selectPostValidator,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
