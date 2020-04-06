import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Cat } from './interfaces/cat.interface';
import { Dog } from './interfaces/dog.interface';
import { CreateCatDto } from './dto/create.cat.dto';
import { CreateDogDto } from './dto/create.dog.dto';
import { PetType } from './constants'

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('/cats')
  async addCat(@Body() createCatDto: CreateCatDto) {
    await this.petsService.addCat(createCatDto);
  }

  @Post('/dogs')
  async addDog(@Body() createDogDto: CreateDogDto) {
    await this.petsService.addDog(createDogDto);
  }

  @Get()
  async findAll(): Promise<Array<Cat | Dog>> {
    return await this.petsService.findAll();
  }

  @Get('/cats')
  async findCats(): Promise<Cat[]> {
    return await this.petsService.findAll<Cat>(PetType.Cat);
  }

  @Get('/dogs')
  async findDogs(): Promise<Dog[]> {
    return await this.petsService.findAll<Dog>(PetType.Dog);
  }

  @Get('/cats/:id')
  async findCat(@Param('id') id: string): Promise<Cat> {
    return await this.petsService.findCatById(id);
  }

  @Get('/dogs/:id')
  async findDog(@Param('id') id: string): Promise<Dog> {
    return await this.petsService.findDogById(id);
  }

  @Get('/cats-weight')
  async getCatsWeight(): Promise<number> {
    return await this.petsService.getCatsWeight();
  }

  @Get('/dogs-weight')
  async getDogsWeight(): Promise<number> {
    return await this.petsService.getDogsWeight();
  }

  @Get('/happy-dogs')
  async getHappyDogs(): Promise<string[]> {
    return await this.petsService.getHappyDogs();
  }

  @Get('/top-owners/:age')
  async getPetOwners(@Param('id') age: number): Promise<string[]> {
    return await this.petsService.getTopThreePetOwnersAtAge(age);
  }
}
