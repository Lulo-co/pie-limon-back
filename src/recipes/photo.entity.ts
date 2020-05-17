import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Recipe, recipe => recipe.photos, { nullable: false })
  recipe: Recipe;
}
