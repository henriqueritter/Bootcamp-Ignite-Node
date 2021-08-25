import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

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
  available: boolean; // atribui valor default como true e coloca a tipagem de boolean nessa propriedade

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }], // referencia a table da entidade atual(entidade cars)
    inverseJoinColumns: [{ name: "specification_id" }], // é a outra coluna da outra table que estamos colocando no many2many
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}
export { Car };
