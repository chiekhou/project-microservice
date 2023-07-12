# !bin/sh

buf generate
buf export . --output ../post-api/src/proto
buf export . --output ../task-api/src/proto
buf export . --output ../user-api/src/proto
buf export . --output ../auth-api/src/proto