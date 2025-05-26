import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { GlobalModule } from './global.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { BrandModule } from './modules/brand/brand.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { TasksModule } from './common/service/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [MongooseModule.forRoot(process.env.URL_DB as string),ScheduleModule.forRoot(),TasksModule,GlobalModule,userModule,CategoryModule,ProductModule, CouponModule,CartModule,OrderModule,BrandModule,SubCategoryModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
