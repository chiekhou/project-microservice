import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddRequest,
  AddResponse,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  POST_CR_UD_SERVICE_NAME,
  Post,
  PostCRUDServiceController,
  UpdateRequest,
  UpdateResponse,
  PostCRUDServiceControllerMethods,
} from './stubs/post/v1alpha/post';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
@Controller()
@PostCRUDServiceControllerMethods()
export class AppController implements PostCRUDServiceController {
  constructor(private readonly appService: AppService) { }
  async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
    let post: Post;
    let posts: Post[] = [];
    if (request.id) {
      post = await this.appService.findById(request.id);
      return { posts: [post] };
    } else if (request.title) {
      post = await this.appService.findByTitle(request.title);
      return { posts: [post] };
    } else {
      posts = await this.appService.findAll();
      return { posts };
    }
  }
  async update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> {
    let post: Post;
    if (request.id) {
      post = await this.appService.update(request.id, request);
      return { post };
    }
  }


  async delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> {
    let post: Post;
    if (request.id) {
      post = await this.appService.delete(request.id);
      return { post };
    }
  }
  async add(request: AddRequest): Promise<AddResponse> {
    let post: Post;
    if (request) {
      post = await this.appService.create(request);
      return { post };
    }

  }
}