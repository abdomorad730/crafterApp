import { Type } from "class-transformer";
import {  IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class updateSubCategoryDto{
   
   
    @IsString()
    @IsOptional()
    name: string;
    
    

}
export class subCategoryDto{
   
   
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()

    @IsNotEmpty()
    category: string;
    
    

}