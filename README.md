## Notes on Controllers, Services, Repositories, DI

## Description

Some references for controllers, services, and repositories. Writes to a file, includes requests for rest client plugin

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Controller
- Controllers handle incoming requests and define the API endpoints.
- They are responsible for receiving the requests, processing them, and returning the appropriate responses.
- Controllers can have multiple methods, each corresponding to a different API endpoint.
- These methods are decorated with various decorators, such as `@Get`, `@Post`, `@Put`, etc., to define the HTTP method and route for each endpoint.
- Inside the methods, we can access the request parameters, query parameters, request body, headers, etc.
- Controllers can also make use of services to perform business logic and interact with the database.
- The responses from the controller methods can be in various formats, such as JSON, HTML, or plain text.

```ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { YourService } from './your.service';
import { YourDto } from './dto/your.dto';

@Controller('endpoint')
export class YourController {
  constructor(private readonly yourService: YourService) {}

  @Post()
  async create(@Body() yourDto: YourDto) {
    return this.yourService.create(yourDto);
  }

  @Get()
  async findAll() {
    return this.yourService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.yourService.findOne(id);
  }
}
```

## Services
- Services in NestJS are responsible for implementing the business logic of an application.
- They are used by controllers to perform operations such as data manipulation, database queries, and external API calls.
- Services are typically injected into controllers using dependency injection.
- They can also be injected into other services if needed.
- Services can have multiple methods that encapsulate different operations.
- These methods can be called from controllers or other services.
- Services can interact with repositories to perform CRUD operations on the database.
- They can also make use of other external libraries or services.
- Services should be designed to be reusable and modular, promoting code reusability and maintainability.

```ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class YourService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<T> {
    return this.repository.findOne(id);
  }

  async update(id: string, entity: T): Promise<T> {
    await this.repository.update(id, entity);
    return this.repository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
```

## Repositories
- Repositories in NestJS are responsible for interacting with the database.
- They provide methods for performing CRUD (Create, Read, Update, Delete) operations on the database.
- Repositories are typically used by services to retrieve and manipulate data.
- They can be injected into services using dependency injection.
- Repositories can be implemented using various database technologies, such as TypeORM, Sequelize, or Mongoose.
- They provide a convenient and consistent way to interact with the database, abstracting away the underlying database-specific details.
- Repositories can define custom methods for querying and manipulating data based on specific business requirements.
- They can also make use of query builders or ORM features to perform complex database operations.
- Repositories should be designed to be modular and reusable, promoting code reusability and maintainability.

```ts
import { EntityRepository, Repository } from 'typeorm';
import { Message } from './message.entity';

@EntityRepository(Message)
export class YourRepository extends Repository<Message> {
  // Custom methods for querying and manipulating data can be defined here
}
```

## DTO
- DTOs in NestJS are used to define the structure and shape of the data that is transferred between different layers of an application.
- They are commonly used to validate and transform incoming request data before it is processed by the application.
- DTOs help in decoupling the shape of the data from the internal implementation details of the application.
- They provide a clear contract between the client and server, ensuring that the data is in the expected format.
- DTOs can be defined as classes or interfaces, with properties representing the fields of the data.
- They can include decorators such as `@IsString`, `@IsNumber`, `@IsNotEmpty`, etc., to enforce validation rules on the data.
- DTOs can be used in controllers to validate and transform incoming request data using the `@Body()` decorator.
- They can also be used in services to validate and transform data before performing business logic or interacting with the database.
- DTOs promote code reusability, maintainability, and help in preventing common security vulnerabilities such as over-posting or under-posting of data.

Example of a DTO:
```ts
export class CreateDto {
  // This decorator ensures that field1 is a string.
  @IsString()
  // This decorator ensures that field1 is not empty.
  @IsNotEmpty()
  field1: string;

  @IsString()
  @IsNotEmpty()
  field2: string;

  @IsString()
  @IsNotEmpty()
  field3: string;
}
```

Using the DTO in the controller:
```ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { YourService } from './your.service';

@Controller('endpoint')
export class YourController {
  constructor(private readonly yourService: YourService) {}

  @Post()
  async create(@Body() createDto: CreateDto) {
    return this.yourService.create(createDto);
  }
}
```

### A quick bit about @Injectable
The @Injectable() decorator is used to define a service/provider that can be injected into other parts of your application.

Usage: It's typically used in service classes right before the class definition. For example:
```ts
@Injectable()
export class MyService {
  // ...
}
```
Dependency Injection: NestJS can automatically handle the creation and provisioning of instances of classes marked with @Injectable(). These instances can then be automatically injected into controllers or other services as dependencies.

Singleton Scope: By default, NestJS instantiates and reuses a single instance of each provider across the entire application, making them singletons. This behavior can be customized with custom provider scopes.

Remember, @Injectable() is a key part of using Nest's powerful Dependency Injection system to organize and structure your code in a scalable and maintainable way.
