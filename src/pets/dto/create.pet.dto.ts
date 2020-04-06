// We should add validation here or in Schema
// It can be done by validation pipe 
// https://docs.nestjs.com/techniques/validation
// I don't know business requirements, so I won't add any validation

export class CreatePetDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
  readonly weight: number;
}
