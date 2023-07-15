import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../primsa.service';
import * as bcrypt from 'bcrypt';
import { FindRequest, FindResponse, User } from '../stubs/user/v1alpha/message';
import {
  USER_SERVICE_NAME,
  UserServiceClient,
} from '../stubs/user/v1alpha/service';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;
  constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc, private prisma: PrismaService) { }
  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async findUser(req: FindRequest, md: Record<string, any>): Promise<User> {
    const meta = new Metadata();
    Object.entries(md).map(([k, v]) => meta.add(k, v));
    const res: FindResponse = await firstValueFrom(
      this.userService.find(req, meta) as any,
    );
    return res.user?.[0];
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // First User of the DB is the admin
    if ((await this.users({})).length === 0) {
      data.role = Role.ADMIN;
    }
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async checkPassword(
    email: string,
    password: string,
  ): Promise<{ user: User; match: boolean }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        createdAt: true,
        email: true,
        firstName: true,
        id: true,
        lastName: true,
        updatedAt: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return { user: null, match: false };
    }

    const match = await bcrypt.compare(password, user.password);

    return { user, match };
  }
}


// import { OnModuleInit } from '@nestjs/common';
// import { Inject, Injectable } from '@nestjs/common';
// import { ClientGrpc } from '@nestjs/microservices';
// import { FindRequest, FindResponse, User } from '../stubs/user/v1alpha/message';
// import {
//   USER_SERVICE_NAME,
//   UserServiceClient,
// } from '../stubs/user/v1alpha/service';
// import { firstValueFrom } from 'rxjs';
// import { Metadata } from '@grpc/grpc-js';
// @Injectable()
// export class UserService implements OnModuleInit {
//   private userService: UserServiceClient;
//   constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) { }
//   onModuleInit() {
//     this.userService =
//       this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
//   }
//   async findUser(req: FindRequest, md: Record<string, any>): Promise<User> {
//     const meta = new Metadata();
//     Object.entries(md).map(([k, v]) => meta.add(k, v));
//     const res: FindResponse = await firstValueFrom(
//       this.userService.find(req, meta) as any,
//     );
//     return res.user?.[0];
//   }
// }

