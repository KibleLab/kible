import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TableMgnt } from './TableMgnt';
import { MenuSlct } from './MenuSlct';

@Entity('wishlist')
export class WishList {
  @Index('table_no_idx')
  @ManyToOne(() => TableMgnt, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'table_no' })
  table_no!: number;

  @Index('menu_name_idx')
  @ManyToOne(() => MenuSlct, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'menu_name' })
  menu_name!: string;

  @Column({ nullable: false })
  wish_quantity!: number;
}
