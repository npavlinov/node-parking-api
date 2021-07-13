import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Vehicle } from 'src/vehicles/vehicles.model';

@Table
export class Category extends Model {
  @Column
  type: string;

  @Column
  dayTax: number;

  @Column
  nightTax: number;

  @Column
  spaceSize: number;

  @HasMany(() => Vehicle)
  vehicles: Vehicle[];
}
