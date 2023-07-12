import { GrpcOptions, Transport, ClientProviderOptions } from '@nestjs/microservices';
import { POST_V1ALPHA_PACKAGE_NAME } from './stubs/post/v1alpha/post';
import {
    USER_SERVICE_NAME,
    USER_V1ALPHA_PACKAGE_NAME,
} from '../../user-api/src/stubs/user/v1alpha/service';
import { ChannelCredentials } from '@grpc/grpc-js';
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

export const userGrpcOptions: ClientProviderOptions = {
    name: USER_SERVICE_NAME,
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:6000',
        package: USER_V1ALPHA_PACKAGE_NAME,
        loader: {
            includeDirs: [join(__dirname, './proto')],
        },
        protoPath: [join(__dirname, './proto/user/v1alpha/service.proto')],
        credentials: ChannelCredentials.createInsecure(),
    },
};