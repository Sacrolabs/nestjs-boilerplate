import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
  wrap,
} from '@mikro-orm/core';
import { User } from '../../user/entities';

@Entity()
export class RefreshToken {
  @PrimaryKey()
  id: number;

  @ManyToOne()
  user: User;

  @Property({ hidden: true })
  @Unique()
  token: string;

  @Property()
  expiresAt: Date;

  constructor(user: User, token: string, expiresAt: Date) {
    this.user = user;
    this.token = token;
    this.expiresAt = expiresAt;
  }

  toJSON() {
    return wrap(this).toObject();
  }
}
