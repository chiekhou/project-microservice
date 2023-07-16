import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddRequest,
  AddResponse,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  COMMENTAIRE_CR_UD_SERVICE_NAME,
  Commentaire,
  CommentaireCRUDServiceController,
  UpdateRequest,
  UpdateResponse,
  CommentaireCRUDServiceControllerMethods,
} from './proto/stubs/commentaire/v1alpha/post';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@CommentaireCRUDServiceControllerMethods()
export class AppController implements CommentaireCRUDServiceController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(COMMENTAIRE_CR_UD_SERVICE_NAME, 'get')
  async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
    let commentaire: Commentaire;
    let commentaires: Commentaire[] = [];
    if (request.id) {
      commentaire = await this.appService.findById(request.id);
      return { commentaires: [commentaire] };
    } else if (request.name) {
      commentaire = await this.appService.findByName(request.name);
      return { commentaires: [commentaire] };
    } else {
      commentaires = await this.appService.findAll();
      return { commentaires };
    }
  }

  @GrpcMethod(COMMENTAIRE_CR_UD_SERVICE_NAME, 'update')
  async update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> {
    const updatedCommentaire = await this.appService.update(
      request.id,
      request,
    );
    return { commentaire: updatedCommentaire };
  }

  @GrpcMethod(COMMENTAIRE_CR_UD_SERVICE_NAME, 'delete')
  async delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> {
    const deletedCommentaire = await this.appService.delete(request.id);
    return { commentaire: deletedCommentaire };
  }

  @GrpcMethod(COMMENTAIRE_CR_UD_SERVICE_NAME, 'add')
  async add(request: AddRequest): Promise<AddResponse> {
    const createdCommentaire = await this.appService.create(request);
    return { commentaire: createdCommentaire };
  }
}
