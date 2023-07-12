import { Injectable } from '@nestjs/common';
import { Post } from './stubs/post/v1alpha/post';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }
  create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  findById(id: number): Promise<Post> {
    return this.prisma.post.findFirst({
      where: { id: id },
    });
  }

  findByTitle(title: string): Promise<Post> {
    return this.prisma.post.findFirst({
      where: { title: title },
    });
  }
  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }
  delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id: Number(id) },
    });
  }

  async update(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: { title: data.title, body: data.body, userId: data.userId }
    });
  }
}
