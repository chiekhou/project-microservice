import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/primsa.service';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { userGrpcOptions } from 'src/config/grpc.option';

@Module({
  imports: [AuthModule, ClientsModule.register([userGrpcOptions])],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule { }
