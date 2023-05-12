import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

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
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
