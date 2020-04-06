import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
// App aren't secure
// We can easily secure it by adding:
// helmet, csurf, express-rate-limit, hpp, xss
// We should also add cors and mongo sanitizer
// https://docs.nestjs.com/techniques/security

// I will add only one package to show how it can be done

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  await app.listen(process.env.PORT);
}
bootstrap();
