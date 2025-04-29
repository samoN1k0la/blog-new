import { 
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  Body,
  Request,
  UploadedFile
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth,
  ApiBody,
  ApiConsumes
} from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { FilterQueryDto } from '../../../common/dto/filter-query.dto';
import { Post as PostEntity } from '../entities/post.entity';
import { ChangePostStatusDto } from '../dto/change-post-status.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  async getPosts(
    @Query() query: PaginationQueryDto,
    @Query() filters: FilterQueryDto
  ): Promise<PaginatedResponse<PostEntity>> {
    return this.postsService.getPosts(query, filters);
  } 

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('coverImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        status: { type: 'string', enum: ['draft', 'pending', 'published'] },
        coverImage: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Request() req: any
  ) {
    return this.postsService.createPost(createPostDto, req.user, coverImage);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get my posts' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) 
  async getMyPosts(
    @Query() query: PaginationQueryDto,
    @Query() filters: FilterQueryDto,
    @Request() req: any
  ): Promise<PaginatedResponse<PostEntity>> {
    return this.postsService.getMyPosts(query, req.user, filters);
  }
  
  /*@Get('search')
  @ApiOperation({ summary: 'Search published posts' })
  async searchPosts(@Query('query') query: string) {
    return this.postsService.searchPosts(query);
  }*/

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific post' })
  async getPost(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a post' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('coverImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        status: { type: 'string', enum: ['draft', 'pending', 'published'] },
        coverImage: { type: 'string', format: 'binary' },
      },
    },
  })
  async editPost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any,
    @UploadedFile() coverImage?: Express.Multer.File,
  ) {
    return this.postsService.editPost(id, updatePostDto, req.user, coverImage);
  } 

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Param('id') id: string, 
    @Request() req: any
  ): Promise<{ status: string; message: string }> {
    await this.postsService.deletePost(id, req.user);
    return {
      status: 'success',
      message: 'Post successfully deleted'
    };
  }

  @Patch('status/:id')
  @ApiOperation({ summary: 'Change post status' })
  async changePostStatus(
    @Param('id') id: string,
    @Body() statusDto: ChangePostStatusDto,
  ) {
    console.log(statusDto);
    return this.postsService.changePostStatus(id, statusDto.status);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all posts by a specific user' })
  async getPostsByUserId(
    @Query() query: PaginationQueryDto,
    @Query() filters: FilterQueryDto,
    @Param('id') id: string
  ): Promise<PaginatedResponse<PostEntity>> {
    return this.postsService.getPostsByUserId(query, id, filters);
  }
}
