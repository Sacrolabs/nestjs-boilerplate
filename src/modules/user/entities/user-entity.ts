import {
  Property,
  Entity,
  Unique,
  PrimaryKey,
  Index,
  OneToOne,
} from '@mikro-orm/core';
import crypto from 'crypto';
import { IsEmail } from 'class-validator';
import { ConfirmationToken } from '../../auth/entities';

export interface CreateUserEntityOptions {
  readonly registerWithEmail?: {
    email: string;
    username: string;
    password: string;
  };
}

@Entity()
@Index({ name: 'idx_fts_user' })
export class User {
  @PrimaryKey()
  public readonly id: number;

  @Index()
  @Property()
  @Unique()
  @IsEmail()
  public email: string;

  @Index()
  @Property({ nullable: true })
  @Unique()
  public username: string | null = null;

  @Property({ nullable: true })
  public name: string | null = null;

  @Property({ hidden: true, nullable: true })
  public password: string | null = null;

  @Property({
    columnType: 'tsvector',
    nullable: true,
    comment:
      'Service field to keep full-text search index cache for efficient searching.',
  })
  public __indexingTsv: string | null = null;

  @OneToOne(
    () => ConfirmationToken,
    (confirmationToken) => confirmationToken.user,
    {
      owner: true,
      orphanRemoval: true,
      nullable: true,
    },
  )
  public confirmationToken: ConfirmationToken | null = null;

  constructor(createUserEntityOption: CreateUserEntityOptions) {
    this.email = createUserEntityOption.registerWithEmail.email;
    this.username = createUserEntityOption.registerWithEmail.username;
    this.password = User.passwordToHash(
      createUserEntityOption.registerWithEmail.password,
    );
  }

  public static passwordToHash(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }
}
