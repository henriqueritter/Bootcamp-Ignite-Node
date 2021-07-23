import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available = true; // atribui valor default como true e coloca a tipagem de boolean nessa propriedade

  @Column()
  license_plate: string;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column() // assim teremos o id da categoria
  category_id: string;

  @CreateDateColumn()
  created_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Car };
