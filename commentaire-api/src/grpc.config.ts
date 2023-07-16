import { GrpcOptions, Transport } from '@nestjs/microservices';
import { COMMENTAIRE_V1ALPHA_PACKAGE_NAME } from './proto/stubs/commentaire/v1alpha/post';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6000',
    package: COMMENTAIRE_V1ALPHA_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/commentaire/v1alpha/commentaire.proto'),
  },
}) as GrpcOptions;