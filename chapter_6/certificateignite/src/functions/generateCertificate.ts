import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from '../utils/dynamodbClient'

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}
//aws sempre envia na structure event
export const handler: APIGatewayProxyHandler = async (event) => {
  //vamos receber id, name e grade do alune
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  //usamos o put para inserir dados na table
  await document.put({
    TableName: "users_certificate", // passamos o nome da  table
    Item: {         //e quais informacoes vamos inserir
      id,
      name,
      grade,
      created_at: new Date(),
    }
  }).promise(); //o put nao retorna nenhuma informacao quando cria

  const response = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise(); //o query retorna um array com todos os elementos, mas como tem uma condition ele vai trazer aquilo que estamos buscando na posicao zero do array


  return {
    statusCode: 201,
    body: JSON.stringify({
      message: JSON.stringify(response.Items[0]) //retorna o primeiro item do nosso documento criado
    })
  }
}