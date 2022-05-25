import { DynamoDB } from 'aws-sdk';


const options = {
  region: "localhost",
  endpoint: "http://localhost:8000", //8000 porta padrao do dynamo
}

const isOffline = () => {
  return process.env.IS_OFFLINE; //var de ambiente provida pelo plugin serverless-offline
}

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options) // estiver local usa dynamolocal se nao
  : new DynamoDB.DocumentClient(); //usa o dynamo na AWS