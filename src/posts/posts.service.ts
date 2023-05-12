import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

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
    const {
      content,
      user: { name: user, id },
    } = createPostDto;
    return this.prisma.post.create({
      data: {
        content,
        user: {
          connectOrCreate: {
            where: { id },
            create: { name: user },
          },
        },
      },
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
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
