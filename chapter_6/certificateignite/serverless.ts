import type { AWS } from '@serverless/typescript';


const serverlessConfiguration: AWS = {
  service: 'certificateignite',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    hello: {
      handler: "src/functions/hello.handler",
      events: [
        {
          http: {
            path: "hello",
            method: "get",
            cors: true
          }
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  //resources vamos criara estrutura de tabela(a mesma no dinamodb)
  resources: {
    Resources: {
      dbCertificateUsers: { //nome da table
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "users_certificate",
          ProvisionedThroughput: { //controle de quota
            ReadCapacityUnits: 5,//quantas reqs por leitura
            WriteCapacityUnit: 5 //quantas reqs por escrita
          },
          //props da nossa table
          AttributeDefinitions: [
            {
              AttributeName: "id",  //nossa PK
              AttributeType: "S"  //S para string 
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
