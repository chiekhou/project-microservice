import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Commentaire } from './proto/stubs/commentaire/v1alpha/post';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  commentaire: Commentaire;

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
