import { Body, Controller, Get, HttpCode, Param, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { userService } from "./users.service";
import { confirmEmailDto, forgetDto, paramDto, resetDto, updatePassDtoDto, userDto } from "./dto/user.dto";
import { UserDocument } from "src/DB/models/users.model";
import { userRoles } from "src/common/types/types";
import { User } from "src/common/decorator/user.decorator";
import { Auth } from "src/common/decorator/auth.decorator";
import { MulterHost } from "src/common/utils/multer";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('users')
export class userController {
    constructor(private readonly _userService: userService) { }


    @Post('/signup/crafter')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file', MulterHost(['image/png', 'image/jpeg', 'image/JPG'])))

    SignUp(@Body() body: userDto,
        @UploadedFile() file: Express.Multer.File): Promise<UserDocument> {
        return this._userService.SignUp(body,file)
    }
    @Post('/signup/user')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file', MulterHost(['image/png', 'image/jpeg', 'image/JPG'])))
    SignUpAsUser(@Body() body: userDto, @UploadedFile() file: Express.Multer.File): Promise<UserDocument> {
        return this._userService.SignUpAsUser(body,file)
    }

    @Auth(userRoles.user, userRoles.crafter, userRoles.admin)
    @Get('/profile')
    @HttpCode(200)
    profile(@User() user: UserDocument): any {
        return { user }
    }

    @Patch('/confirmMail')
    confirmEmail(@Body() body: confirmEmailDto): Promise<UserDocument> {
        return this._userService.confirmEmail(body)
    }

    @Post('/signin')
    @HttpCode(200)
    SignIn(@Body() body: userDto): Promise<UserDocument> {
        return this._userService.SignIn(body)
    }
    @Post('/forgetPassword')
    @HttpCode(200)
    forgetPassword(@Body() body: forgetDto): any {
        return this._userService.forgetPassword(body)
    }

    @Patch('/resetPassword')
    @HttpCode(200)
    resetPassword(@Body() body: resetDto): any {
        return this._userService.resetPassword(body)
    }

    @Patch('/UpdatePassword')
    @HttpCode(200)
    @Auth(userRoles.admin, userRoles.user, userRoles.crafter)
    updatePassword(@Body() body: updatePassDtoDto, @User() user: UserDocument): any {
        return this._userService.updatePassword(body, user)
    }
    @Get('/dashboard')
    @HttpCode(200)
    @Auth(userRoles.admin)
    dashboard(@User() user: UserDocument): any {
        return this._userService.dashboard(user)
    }




}