import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from '../utils/dynamodbClient'
import { compile } from 'handlebars';

//para gerar a data do certificado
import * as dayjs from "dayjs";

//para recuperar o template do certificado
import { join } from 'path';
//para ler o template
import { readFileSync } from 'fs';
interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  medal: string;
  date: string;
}

//compila o handlebars com as informacoes
const compileTemplate = async (data: ITemplate) => {
  //process.cwd() parte a raiz do projeto
  const templateFilePath = join(process.cwd(), "src", "templates", "certificates.hbs");

  const htmlTemplate = readFileSync(templateFilePath, "utf-8");

  //compila o template com as informacoes do data
  return compile(htmlTemplate)(data);

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
      created_at: new Date().getTime(),
    }
  }).promise(); //o put nao retorna nenhuma informacao quando cria

  const response = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise(); //o query retorna um array com todos os elementos, mas como tem uma condition ele vai trazer aquilo que estamos buscando na posicao zero do array

  //recupera o selo.png
  const medalPath = join(process.cwd(), "src", "templates", "selo.png");

  //converte em base64 para colocar no template do handlebars
  const medal = readFileSync(medalPath, "base64");

  //cria o objeto data
  const data: ITemplate = {
    name,
    id,
    grade,
    date: dayjs().format("DD/MM/YYYY"), //gera a data atual
    medal
  }

  const content = await compileTemplate(data);


  return {
    statusCode: 201,
    body: JSON.stringify(response.Items[0]) //retorna o primeiro item do nosso documento criado
  }
}