import { Test, TestingModule } from '@nestjs/testing';
import { RecipesResolver } from './recipes.resolver';

describe('Recipes Controller', () => {
  let controller: RecipesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesResolver],
    }).compile();

    controller = module.get<RecipesResolver>(RecipesResolver);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
