import { Module } from '@nestjs/common';
import { RecipesController } from './recipes/recipes.controller';
import { RecipesService } from './recipes/recipes.service';

@Module({
    controllers: [
        RecipesController
    ],
    providers: [
        RecipesService
    ],
})
export class AppModule {
}