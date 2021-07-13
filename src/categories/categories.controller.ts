import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createUserDto: CreateCategoryDTO): Promise<Category> {
    return this.categoriesService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
