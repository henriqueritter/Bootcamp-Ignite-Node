import type { AWS } from '@serverless/typescript';


const serverlessConfiguration: AWS = {
  service: 'certificateignite',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dynamodb-local', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: ["*"]
      },
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: ["*"]
      }
    ]

  },
  //para montar o zip para deploy
  package: {
    individually: false, //gera tudo em um unico zip
    include: [".src/templates/**"] //qualquer arquivo que existir na pasta template sera incluido no zip
  },
  // import the function via paths
  functions: {
    generateCertificate: {
      handler: "src/functions/generateCertificate.handler",
      events: [
        {
          http: {
            path: "generateCertificate",
            method: "post",
            cors: true
          }
        }
      ]
    },
    verifyCertifiacte: {
      handler: "src/functions/verifyCertificate.handler",
      events: [
        {
          http: {
            path: "verifyCertificate/{id}", //recebe o parametro id
            method: "get",
            cors: true
          }
        }
      ]
    }
  },
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
      external: ["chrome-aws-lambda"],
    },
    dynamodb: { //para rodar o dynamo localmente
      stages: ["dev", "local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      }
    }
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
            WriteCapacityUnits: 5 //quantas reqs por escrita
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
