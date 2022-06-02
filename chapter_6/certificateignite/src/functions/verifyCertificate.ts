import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient'

interface IUserCertficate {
  name: string;
  id: string;
  grade: string;
  created_at: string;
}
export const handler: APIGatewayProxyHandler = async (event) => {
  //http://localhost:3000/verifyCertificate/{id}
  const { id } = event.pathParameters;

  //busca o aluno pelo id
  const response = await document.query({
    TableName: 'users_certificate',
    KeyConditionExpression: "id=:id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();

  //recupera a primeira posicao do retorno acima
  const userCertificate = response.Items[0] as IUserCertficate;

  //se o usuario existir retorna os dados para ele
  if (userCertificate) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Certificado Válido.",
        name: userCertificate.name,
        url: `https://certificateignite2022-hrqritter.s3.amazonaws.com/${id}.pdf`,
      })
    }
  };

  //caso nao encontre o usuario retorne um 400
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Certificado não inválido."
    })
  }
}