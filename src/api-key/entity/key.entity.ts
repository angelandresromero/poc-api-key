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

  @Column()
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expirationDate?: Date;

  // @Column({ type: 'simple-array', nullable: true })
  // scopes: string[]; // TODO: Implement scopes
}