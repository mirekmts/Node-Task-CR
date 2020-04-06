import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { Dog } from './interfaces/dog.interface';
import { Owner } from './interfaces/owner.interface';
import { getTotalWeight } from './helpers/weight.helper';
import { CreateCatDto } from './dto/create.cat.dto';
import { CreateDogDto } from './dto/create.dog.dto';
import { SchemaType, PetType } from './constants'
import { dataNotFound } from './helpers/response.helpers'
@Injectable()
export class PetsService {
  constructor(
    @InjectModel(SchemaType.Cat) private readonly catModel: Model<Cat>,
    @InjectModel(SchemaType.Dog) private readonly dogModel: Model<Dog>,
    @InjectModel(SchemaType.Owner) private readonly ownerModel: Model<Owner>,
  ) {}

  async addCat(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async addDog(createDogDto: CreateDogDto): Promise<Dog> {
    const createdDog = new this.dogModel(createDogDto);
    return createdDog.save();
  }

  async findAll<T = Cat | Dog>(petType?: PetType.Cat | PetType.Dog): Promise<T[]> {
    switch (petType) {
      case PetType.Cat:
        return this.catModel.find().exec();
      case PetType.Dog:
        return this.dogModel.find().exec();
      default:
        return [
          ...(await this.catModel.find().exec()),
          ...(await this.dogModel.find().exec()),
        ];
    }
  }

  // We can create a error handling middleware to generic respond when error occurs
  async findCatById(catId: string): Promise<Cat> {
    try {
      const cat = await this.catModel.findById(catId);
      if (!cat) {
        throw Error
      }
      return cat;
    } catch (e) {
      dataNotFound('Cat')
    }
  }

  async findDogById(dogId: string): Promise<Dog> {
    try {
      const dog = await this.dogModel.findById(dogId);
      if (!dog) {
        throw Error
      }
      return dog;
    } catch (e) {
      dataNotFound('Dog')
    }
  }

  async getCatsWeight(): Promise<number> {
    const cats = await this.catModel.find({}, { weight: 1 }).exec();
    return getTotalWeight(cats);
  }

  async getDogsWeight(): Promise<number> {
    const dogs = await this.dogModel.find({}, { weight: 1 }).exec();
    return getTotalWeight(dogs);
  }

  async getHappyDogs(): Promise<string[]> {
    const happyDogs = await this.dogModel.find({ wagsTail: true }, {name: 1})
    return happyDogs.map(dog => dog.name)
  }

  async getTopThreePetOwnersAtAge(ownerAge: number): Promise<any> {
    const owners = await this.ownerModel.aggregate([
      {
        $group: {
          _id: {
            $sum: [{ $size: '$cats' }, { $size: '$dogs' }],
          },
          ids: { $addToSet: '$_id' },
        },
      },
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'owners',
          let: { ownerIds: '$ids' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$ownerIds'] } } },
            {
              $lookup: {
                from: 'cats',
                let: { catIds: '$cats' },
                pipeline: [
                  {
                    $match: { $expr: { $in: ['$_id', '$$catIds'] } },
                  },
                ],
                as: 'cats',
              },
            },
            {
              $lookup: {
                from: 'dogs',
                let: { dogIds: '$dogs' },
                pipeline: [
                  {
                    $match: { $expr: { $in: ['$_id', '$$dogIds'] } },
                  },
                ],
                as: 'dogs',
              },
            },
          ],
          as: 'owners',
        },
      },
    ]);

    let result = [];
    for (const owner of owners) {
      result.push({
        petsCount: owner._id,
        owners: owner.owners.filter(owner => owner.age == ownerAge),
      });
    }

    return result.slice(0, 3);
  }
}
