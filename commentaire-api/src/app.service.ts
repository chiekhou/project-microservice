import { Injectable } from '@nestjs/common';
import { Commentaire } from './proto/stubs/commentaire/v1alpha/post';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CommentaireCreateInput): Promise<Commentaire> {
    return this.prisma.commentaire.create({ data });
  }

  findAll(): Promise<Commentaire[]> {
    return this.prisma.commentaire.findMany();
  }

  findById(id: number): Promise<Commentaire> {
    return this.prisma.commentaire.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<Commentaire> {
    return this.prisma.commentaire.findUnique({ where: { name } });
  }

  async update(id: number, data: Prisma.CommentaireUpdateInput): Promise<Commentaire> {
    return this.prisma.commentaire.update({ where: { id }, data });
  }

  delete(id: number): Promise<Commentaire> {
    return this.prisma.commentaire.delete({ where: { id } });
  }
}
