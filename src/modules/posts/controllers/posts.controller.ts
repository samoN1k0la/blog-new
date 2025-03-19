import { 
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts', description: 'Retrieves a list of all published posts in the system.' })
  async getPosts() {
    return this.postsService.getPosts();
  } 

  @Post()
  @ApiOperation({ summary: 'Create a new post (Editor & Admin)', description: 'Allows editors and admins to create and publish a new post.' })
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Request() req: any
  ) {
    return this.postsService.createPost(createPostDto, req.user);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get my posts', description: 'Returns a list of posts created by the currently authenticated user.' })
  @UseGuards(JwtAuthGuard) 
  async getMyPosts(@Request() req: any) {
    return this.postsService.getMyPosts(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific post', description: 'Fetches the details of a post by its ID.' })
  async getPost(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a post (Editor & Admin)', description: 'Allows editors and admins to modify an existing post.' })
  @UseGuards(JwtAuthGuard)
  async editPost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any
  ) {
    return this.postsService.editPost(id, updatePostDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post (Editor & Admin)', description: 'Enables editors and admins to remove a post from the system.' })
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string, @Request() req: any) {
    await this.postsService.deletePost(id, req.user);
  }

  @Patch('status/:id')
  @ApiOperation({ summary: 'Change post status', description: 'Updates the status of a post, setting it to draft, pending, or published.' })
  async changePostStatus(
    @Param('id') id: string,
    @Body() statusDto: { status: string },
  ) {
    return this.postsService.changePostStatus(id, statusDto.status);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all posts by a specific user', description: 'Retrieves all posts published by a particular user.' })
  async getPostsByUserId(@Param('id') id: string) {
    return this.postsService.getPostsByUserId(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search posts', description: 'Searches for posts based on a keyword in the title or content.' })
  async searchPosts(@Query('q') q: string) {
    return this.postsService.searchPosts(q);
  }

}
