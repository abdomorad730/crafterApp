import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule'
import { OTPRepository, userRepository } from 'src/DB/repository';

@Injectable()
export class TasksService {
    constructor(
        private readonly OTPRepository: OTPRepository,
        private readonly userRepository: userRepository

    ) {
    }

   @Cron('0 */6 * * *')
    //@Cron('*/30 * * * * *')
    async handleSixHourCron() {
        const OTPs = await this.OTPRepository.find({});
            
        const expiredOtps = OTPs.filter((otp: any)=>Date.now()>new Date(otp.expireAt).getTime());
      
        console.log(expiredOtps.length);
        if (expiredOtps.length) {
          const expiredIds = expiredOtps.map((otp: any) => otp._id);
          const expiredEmails=expiredOtps.map((otp:any)=>otp.userId)
          await this.userRepository.deleteMany({_id: { $in: expiredEmails },confirmed:false})
          await this.OTPRepository.deleteMany({ _id: { $in: expiredIds } });
        }


    }
}
