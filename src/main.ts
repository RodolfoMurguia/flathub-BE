import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //Added Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Flathub API')
    .setDescription('Flathub API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(process.env.GITHUB_TOKEN);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
