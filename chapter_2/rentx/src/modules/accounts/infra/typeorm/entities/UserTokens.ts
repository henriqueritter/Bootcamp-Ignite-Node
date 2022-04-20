import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { User } from "./User";

@Entity("users_tokens")
class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User) // muitos user tokens para o mesmo usuário
  @JoinColumn({ name: "user_id" })
  User: User;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;
}

export { UserTokens };
