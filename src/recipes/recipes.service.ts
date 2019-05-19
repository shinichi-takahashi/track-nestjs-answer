import { Injectable } from '@nestjs/common';
import { Recipe } from "./recipe.entity";
import { plainToClass, plainToClassFromExist } from "class-transformer";

@Injectable()
export class RecipesService {
    private recipes: Recipe[] = [
        plainToClass(Recipe, {
            id: 1,
            title: 'チキンカレー',
            making_time: '45分',
            serves: '4人',
            ingredients: '玉ねぎ,肉,スパイス',
            cost: 1000,
            created_at: '2016-01-10 12:10:12',
            updated_at: '2016-01-10 12:10:12'
        }),
        plainToClass(Recipe, {
            id: 2,
            title: 'オムライス',
            making_time: '30分',
            serves: '2人',
            ingredients: '玉ねぎ,卵,スパイス,醤油',
            cost: 700,
            created_at: '2016-01-11 13:10:12',
            updated_at: '2016-01-11 13:10:12'
        })
    ];

    list() {
        return this.recipes;
    }

    get(id: number) {
        return this.recipes.find(recipe => {
            return id === recipe.id;
        });
    }

    create(recipe: Recipe) {
        recipe.id = 3;
        this.recipes.push(recipe);

        return recipe;
    }

    update(id: number, data: any) {
        const recipe = this.recipes.find(r => r.id === id);
        const newRecipe = plainToClassFromExist(recipe, data)!;

        this.recipes = this.recipes.filter(r => r.id === id);
        this.recipes.push(newRecipe);

        return newRecipe;
    }

    delete(id: number) {
        if (this.recipes.find(r => r.id === id) === undefined) {
            throw new Error();
        }

        return this.recipes.filter(recipe => {
            return id !== recipe.id;
        });
    }
}
