import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { AuthGuard } from 'src/common/guard/userGuard';
import { CategoryRepository, ProductRepository, SubCategoryRepository } from 'src/DB/repository';
import { UploadedFileService } from 'src/common/service/uploadService';
import { CategoryModel, ProductModel, SubCategoryModel } from 'src/DB/models';

@Module({
  imports:[SubCategoryModel,CategoryModel,ProductModel],
  controllers: [SubCategoryController],
  providers: [SubCategoryService,AuthGuard,SubCategoryRepository,CategoryRepository,UploadedFileService,ProductRepository]
})
export class SubCategoryModule {}
