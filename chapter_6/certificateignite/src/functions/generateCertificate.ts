import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from '../utils/dynamodbClient'
import { compile } from 'handlebars';

//S3 para salvar o certificado
import { S3 } from 'aws-sdk';

//para gerar pdf
import chromium from "chrome-aws-lambda";

//para gerar a data do certificado
import dayjs from "dayjs";

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
  const templateFilePath = join(process.cwd(), "src", "templates", "certificate.hbs");

  const htmlTemplate = readFileSync(templateFilePath, "utf-8");

  //compila o template com as informacoes do data
  return compile(htmlTemplate)(data);

}

//aws sempre envia na structure event
export const handler: APIGatewayProxyHandler = async (event) => {
  //vamos receber id, name e grade do alune
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;


  const response = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise(); //o query retorna um array com todos os elementos, mas como tem uma condition ele vai trazer aquilo que estamos buscando na posicao zero do array

  //recupera o id do aluno para ver se ele nao existe
  const userAlreadyExists = response.Items[0];

  //se o aluno nao existir entao cria ele na base
  if (!userAlreadyExists) {
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

  }



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


  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    //headless: chromium.headless, //roda ele em background
  });

  const page = await browser.newPage();

  await page.setContent(content);

  const pdfFile = await page.pdf({
    format: "a4",
    landscape: true,
    printBackground: true, //imprime o background do arquivo conforme definido no html
    preferCSSPageSize: true, //força para que seja do tamanho definido no @page do HTML do template do handlebars
    path: process.env.IS_OFFLINE ? "./certificate.pdf" : null, //gera certificado localmente
  });

  await browser.close();

  //para salvar o certificado.pdf no bucket no S3
  const s3 = new S3();

  //  //para criar o bucket 
  //await s3.createBucket({
  //  Bucket: "certificateignite2022"
  //}).promise();

  await s3.putObject({
    Bucket: "certificateignite2022",
    Key: `${id}.pdf`,
    ACL: "public-read",
    Body: pdfFile,
    ContentType: "application/pdf"
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificado criado com sucesso.",
      url: `https://certificateignite2022.s3.amazonaws.com/${id}.pdf`
    }) //retorna o primeiro item do nosso documento criado
  }
}