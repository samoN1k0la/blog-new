import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository
  ) {}

  // Create a new post
  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return await this.postRepository.createPost(
      createPostDto.title,
      createPostDto.content,
      user
    );
  }

  // Get all posts
  async getPosts(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['author'],
    });
  }

  // Get posts by the currently authenticated user
  async getMyPosts(user: User): Promise<Post[]> {
    return this.postRepository.findByAuthor(user.id);
  }

  // Get a post by ID
  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  // Edit an existing post
  async editPost(id: string, updatePostDto: UpdatePostDto, user: User): Promise<Post> {
    const post = await this.getPostById(id);

    // Check if the user is the author or has an admin/editor role
    if (post.author.id !== user.id && !user.roles.includes('admin') && !user.roles.includes('editor')) {
      throw new ForbiddenException('You do not have permission to edit this post');
    }

    Object.assign(post, updatePostDto);

    return this.postRepository.save(post);
  }

  // Delete a post
  async deletePost(id: string, user: User): Promise<void> {
    const post = await this.getPostById(id);

    // Check if the user is the author or has an admin/editor role
    if (post.author.id !== user.id && !user.roles.includes('admin') && !user.roles.includes('editor')) {
      throw new ForbiddenException('You do not have permission to delete this post');
    }

    await this.postRepository.remove(post);
  }

  // Change post status
  async changePostStatus(id: string, status: string): Promise<Post> {
    const validStatuses = ['draft', 'pending', 'published'];

    if (!validStatuses.includes(status)) {
      throw new ForbiddenException('Invalid status');
    }

    const post = await this.getPostById(id);
    post.status = status;

    return this.postRepository.save(post);
  }

  // Get posts by a specific user
  async getPostsByUserId(userId: string): Promise<Post[]> {
    return this.postRepository.findByAuthor(userId);
  }

  // Search posts based on a keyword
  async searchPosts(query: string): Promise<Post[]> {
    return this.postRepository.createQueryBuilder('post')
      .where('post.title LIKE :query OR post.content LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  // Get recent posts
  async getRecentPosts(limit: number): Promise<Post[]> {
    return this.postRepository.findRecent(limit);
  }
}

