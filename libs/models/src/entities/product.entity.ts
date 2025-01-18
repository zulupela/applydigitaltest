import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn('text', { nullable: false, unique: true })
  public id: string;

  @Column('text', { nullable: false })
  public sku: string;

  @Column('text', { nullable: false })
  public name: string;

  @Column('text', { nullable: false })
  public brand: string;

  @Column('text', { nullable: false })
  public model: string;

  @Column('text', { nullable: false })
  public category: string;

  @Column('text', { nullable: false })
  public color: string;

  @Column('float', { nullable: false })
  public price: number;

  @Column('text', { nullable: false })
  public currency: string;

  @Column('int', { nullable: false })
  public stock: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
