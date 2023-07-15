import { GrpcOptions, Transport, ClientProviderOptions } from '@nestjs/microservices';
import { POST_V1ALPHA_PACKAGE_NAME } from './stubs/post/v1alpha/post';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:6000',
        package: POST_V1ALPHA_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/post/v1alpha/post.proto'),
    },
}) as GrpcOptions;

