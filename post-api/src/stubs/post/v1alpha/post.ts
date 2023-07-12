/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "post.v1alpha";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: string;
}

export interface GetRequest {
  id: number;
  title: string;
  body: string;
  userId: string;
}

export interface GetResponse {
  posts: Post[];
}

export interface AddRequest {
  title: string;
  body: string;
  userId: string;
}

export interface AddResponse {
  post: Post | undefined;
}

export interface UpdateRequest {
  id: number;
  title: string;
  body: string;
  userId: string;
}

export interface UpdateResponse {
  post: Post | undefined;
}

export interface DeleteRequest {
  id: number;
  userId: string;
}

export interface DeleteResponse {
  post: Post | undefined;
}

export const POST_V1ALPHA_PACKAGE_NAME = "post.v1alpha";

export interface PostCRUDServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface PostCRUDServiceController {
  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function PostCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PostCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PostCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const POST_CR_UD_SERVICE_NAME = "PostCRUDService";
