import { uuid } from 'uuidv4';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseUUIDPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { CreateExecutionDto } from './dto/create-execution.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { UserEntity, UserRoleEnum } from '@modules/user/entities/user.entity';
import { CurrentUser } from '@common/decorators/current-user.decorator';
// import { GetUploadUrlDto } from './dto/get-upload-url.dto';
import { FindAllExecutionsQueryDto } from './dto/find-all-executions-query.dto';
import { AddNoteDto } from './dto/add-note.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';

@ApiTags('Executions')
@Controller('executions')
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.TECHNICIAN)
  @Post()
  create(@Body() createExecutionDto: CreateExecutionDto) {
    return this.executionService.create(createExecutionDto);
  }

  // @Roles(
  //   UserRoleEnum.ADMIN,
  //   UserRoleEnum.TECHNICAL_MANAGER,
  //   UserRoleEnum.TECHNICIAN,
  // )
  // @Get('s3/upload-url')
  // getUploadUrl(@Query() getUploadUrlDto: GetUploadUrlDto) {
  //   return this.executionService.getUploadUrl(getUploadUrlDto);
  // }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.TECHNICAL_MANAGER,
    UserRoleEnum.TECHNICIAN,
  )
  @Post('upload-file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (_req, file, callback) => {
          const ext = extname(file.originalname);
          const id = uuid();
          callback(null, `${id}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }

  @Get('files/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'files', filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    return res.sendFile(filePath);
  }

  @Roles(UserRoleEnum.TECHNICAL_MANAGER)
  @Patch(':id/values/:executionValueId/notes')
  @HttpCode(200)
  async updateNote(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('executionValueId', new ParseUUIDPipe()) executionValueId: string,
    @CurrentUser() user: UserEntity,
    @Body() noteDto: AddNoteDto,
  ) {
    await this.executionService.updateNote(
      id,
      executionValueId,
      user.id,
      noteDto,
    );
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICAL_MANAGER,
    UserRoleEnum.TECHNICIAN,
  )
  @Get()
  findAll(@Query() queryDto: FindAllExecutionsQueryDto) {
    return this.executionService.findAll(queryDto);
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICAL_MANAGER,
    UserRoleEnum.TECHNICIAN,
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.executionService.findOne(id);
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICIAN,
  )
  @Delete(':id')
  @HttpCode(204)
  async remove(@CurrentUser() user: UserEntity, @Param('id') id: string) {
    await this.executionService.remove(user, id);
  }
}
