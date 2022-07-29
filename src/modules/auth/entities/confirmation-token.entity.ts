import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
  wrap,
} from '@mikro-orm/core';
import { User } from '../../user/entities';

@Entity()
export class ConfirmationToken {
  @PrimaryKey()
  id: number;

  @OneToOne()
  user: User;

  @Property({ hidden: true })
  @Unique()
  token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  toJSON() {
    return wrap(this).toObject();
  }
}
