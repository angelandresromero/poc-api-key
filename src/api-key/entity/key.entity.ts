import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('api_key')
export class KeyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index({unique: true})
  @Column()
  key: string;

  @Column({default: false})
  revoked: boolean;

  @Column({name: 'user_id'})
  userId: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'expiration_date', type: 'timestamp', nullable: true })
  expirationDate?: Date;

  // @Column({ type: 'simple-array', nullable: true })
  // scopes: string[]; // TODO: Implement scopes
}