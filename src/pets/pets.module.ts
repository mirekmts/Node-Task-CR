import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DogSchema } from './schemas/dog.schema';
import { CatSchema } from './schemas/cat.schema';
import { OwnerSchema } from './schemas/owner.schema';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { SchemaType } from './constants'
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchemaType.Dog, schema: DogSchema },
      { name: SchemaType.Cat, schema: CatSchema },
      { name: SchemaType.Owner, schema: OwnerSchema },
    ]),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
