import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UploadedFileService } from 'src/common/service/uploadService';
import { CategoryRepository, ProductRepository, SubCategoryRepository } from 'src/DB/repository';
import { subCategoryDto, updateSubCategoryDto } from './dto/subCategoryDto';
import { ProductDocument, SubCategory, UserDocument } from 'src/DB/models';
import { FilterQuery, Types } from 'mongoose';
import slugify from 'slugify';

@Injectable()
export class SubCategoryService {constructor(
        private readonly CategoryRepository: CategoryRepository,
        private readonly SubCategoryRepository: SubCategoryRepository,
        private readonly ProductRepository: ProductRepository,
        private readonly UploadedFileService: UploadedFileService,

    ) { }
       async createSubCategory(body:subCategoryDto,user:UserDocument,file:Express.Multer.File){
            const {name,category}=body
            const categoryExist=await this.CategoryRepository.findOne({name:category})
            const SubCategoryExist = await this.SubCategoryRepository.findOne({name:name.toLowerCase()})
            if(SubCategoryExist){
                throw new ForbiddenException('SubCategory already exist')
            }
            if(!categoryExist){
                throw new NotFoundException('category not found')
            }
            let dummyData={name,userId:user._id,category:categoryExist._id}
            if(file){
                const{secure_url,public_id} =await this.UploadedFileService.uploadFile(file,{folder:`${process.env.folder}/category/${categoryExist.customId}/subCategories`})
               dummyData['image']={secure_url,public_id}
            }
            const SubCategory = await this.SubCategoryRepository.create(dummyData)
            return {SubCategory}
        }

        
        async UpdateSubCategory(body:updateSubCategoryDto,user:UserDocument,file:Express.Multer.File,id:Types.ObjectId){
            const {name}=body
            const SubCategory = await this.SubCategoryRepository.findOne({_id:id,userId:user._id})
            if(!SubCategory){
                throw new ForbiddenException('SubCategory not exist')
            }
            const categoryExist=await this.CategoryRepository.findOne({_id:SubCategory.category})

            if(name){
                if(await this.SubCategoryRepository.findOne({name})){
                    throw new ForbiddenException('SubCategory already exist')
                }
                SubCategory.name=name
                SubCategory.slug=slugify(name,{replacement:'-',trim:true,lower:true,})
            }
            
            if(file){
                await this.UploadedFileService.deleteFile(SubCategory.image['public_id'])
               const{secure_url,public_id} =await this.UploadedFileService.uploadFile(file,{folder:`${process.env.folder}/category/${categoryExist?.customId}/subCategories`})
               SubCategory.image={secure_url,public_id}
            
            }
            await SubCategory.save();
            return {SubCategory}
    
        }
        async DeleteSubCategory(user:UserDocument,id:Types.ObjectId){
            const SubCategory = await this.SubCategoryRepository.findOneAndDelete({_id:id,userId:user._id})
            if(!SubCategory){
                throw new NotFoundException('SubCategory not found')
            }
            const categoryExist=await this.CategoryRepository.findOne({_id:SubCategory.category})

            if(SubCategory?.image){
                await this.UploadedFileService.deleteFolder(`${process.env.folder}/category/${categoryExist?.customId}/subCategories`)
    
            }
            return {SubCategory}
    
        }
        async getAllSubCategory(id:Types.ObjectId){
            let subCategories:SubCategory[]=[]
             subCategories =await this.SubCategoryRepository.find({})
            const filtered = subCategories.filter(
                (p) => p.category?._id==id
              );
            return {subCategories:filtered}
        }
        async getSpecificSubCategory(id:Types.ObjectId){
            const subCategory=await this.SubCategoryRepository.findOne({_id:id})
            if(subCategory){
                throw new NotFoundException('subCategory not found')
            }
            const subCategories=await this.ProductRepository.find({filter:{subCategory:id},populate:[{path:'subCategory'}]})

            return {products:subCategories,subCategory}
        }
    }
       




