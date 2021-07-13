import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Vehicle } from 'src/vehicles/vehicles.model';

@Table
export class Parking extends Model {
  @Column
  spaces: number;

  @Column
  dayTaxTimeStart: number;

  @Column
  dayTaxTimeEnd: number;

  @Column
  nightTaxTimeStart: number;

  @Column
  nightTaxTimeEnd: number;

  @HasMany(() => Vehicle)
  vehicles: Vehicle[];
}
