import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { Post } from '../entities/post.entity';
import { File } from '../entities/file.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { PostStatus } from '../enums/post-status.enum';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User, file?: Express.Multer.File): Promise<Post | null> {
    let coverImage: File | undefined = undefined;

    if (file) {
      coverImage = new File();
      coverImage.filename = file.filename;
      coverImage.path = file.path;
      coverImage.url = `/uploads/${file.filename}`;
      coverImage.type = file.mimetype;
    }

    return await this.postRepository.createPost(
      createPostDto.title,
      createPostDto.content,
      user,
      createPostDto.status,
      coverImage
    );
  }

  async getPosts(query: PaginationQueryDto): Promise<PaginatedResponse<Post>> {
    const [posts, total] = await this.postRepository.findAndCount({
      relations: ['author', 'coverImage'],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      data: posts,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      }
    };
  } 

  async getMyPosts(query: PaginationQueryDto, user: User): Promise<PaginatedResponse<Post>> {
    return this.postRepository.findByAuthor(query, user.id);
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'coverImage'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async editPost(
    id: string,
    updatePostDto: UpdatePostDto,
    user: User,
    file?: Express.Multer.File,
  ): Promise<Post> {
    const post = await this.getPostById(id);

    if (post.author.id !== user.id && !user.roles.includes('admin') && !user.roles.includes('editor')) {
      throw new ForbiddenException('You do not have permission to edit this post');
    }

    Object.assign(post, updatePostDto);

    if (file) {
      const coverImage = new File();
      coverImage.filename = file.filename;
      coverImage.path = file.path;
      coverImage.url = `/uploads/${file.filename}`;
      coverImage.type = file.mimetype;

      post.coverImage = coverImage;
    }

    return this.postRepository.save(post);
  } 

  async deletePost(id: string, user: User): Promise<void> {
    const post = await this.getPostById(id);

    await this.postRepository.remove(post);
  }

  async changePostStatus(id: string, status: PostStatus): Promise<Post> {
    const post = await this.getPostById(id);
    post.status = status;
    return this.postRepository.save(post);
  }

  async getPostsByUserId(query: PaginationQueryDto, userId: string): Promise<PaginatedResponse<Post>> {
    return this.postRepository.findByAuthor(query, userId);
  }

  async searchPosts(query: string): Promise<Post[]> {
    return this.postRepository.searchPosts(query);
  }
 
  async getRecentPosts(limit: number): Promise<Post[]> {
    return this.postRepository.findRecent(limit);
  }
}

