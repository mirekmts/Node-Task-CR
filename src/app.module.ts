import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/config/.env'
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewParser: true,
    }),
    PetsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
