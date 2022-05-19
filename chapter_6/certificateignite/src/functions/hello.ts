import { APIGatewayProxyHandler } from "aws-lambda"

//aws sempre envia na structure event
export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Hello Ignite Serverless"
    })
  }
}