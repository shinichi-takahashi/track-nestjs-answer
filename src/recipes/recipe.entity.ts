import * as v from "class-validator";
export class Recipe {
    id: number;
    @v.IsNotEmpty()
    title: string;

    @v.IsNotEmpty()
    making_time: string;

    @v.IsNotEmpty()
    serves: string;

    @v.IsNotEmpty()
    ingredients: string;

    @v.IsNotEmpty()
    cost: number;
    created_at: string;
    updated_at: string;
}