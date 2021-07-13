import { IsNumberString } from 'class-validator';

export class CreateVehicleDTO {
  @IsNumberString()
  parkingId: string;
  @IsNumberString()
  voucherId?: string;
  @IsNumberString()
  categoryId: string;
}
