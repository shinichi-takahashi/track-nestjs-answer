import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { RecipesService } from "./recipes.service";
import { plainToClass } from "class-transformer";
import { Recipe } from "./recipe.entity";
import { validate } from "class-validator";

@Controller('api')
export class RecipesController {
    constructor(
        private readonly service: RecipesService
    ) {
    }

    @Get()
    @HttpCode(404)
    healthCheck() {
        return {};
    }

    @Get("recipes")
    @HttpCode(200)
    list() {
        return {
            recipes: this.service.list()
        };
    }

    @Get("recipes/:id")
    @HttpCode(200)
    find(@Param("id") id: number) {
        return {
            message: "Recipe details by id",
            recipe: this.service.get(id)
        }
    }

    @Patch("recipes/:id")
    @HttpCode(200)
    update(@Param("id") id: number, @Body() req: any) {
        return {
            message: "Recipe successfully updated!",
            recipe: this.service.update(id, req)
        };
    }

    @Post("recipes")
    @HttpCode(200)
    async create(@Body() req: any) {
        const recipe = plainToClass(Recipe, req);
        const errors = await validate(recipe);
        if(errors.length > 0) {
            return {
                message: "Recipe creation failed!",
                required: "title, making_time, serves, ingredients, cost"
            };
        }

        return {
            message: "Recipe successfully created!",
            recipe: this.service.create(req)
        };
    }

    @Delete("recipes/:id")
    @HttpCode(200)
    delete(@Param() id: number) {
        try {
            this.service.delete(id);
            return {"message": "Recipe successfully removed!"};
        } catch (e) {
            return {"message": "Recipe successfully removed!"};
            // return {"message": "No Recipe found"};
        }
    }
}
