import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async create(category: CreateCategoryDTO): Promise<Category> {
    const parkingInstance = new Category(category);
    return parkingInstance.save();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({
      where: {
        id,
      },
      raw: true,
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
