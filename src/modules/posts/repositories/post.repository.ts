import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource, Brackets } from 'typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../../users/entities/user.entity';
import { File } from '../entities/file.entity';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { FilterQueryDto } from '../../../common/dto/filter-query.dto';
import { PostStatus } from '../enums/post-status.enum';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {
    super(Post, dataSource.createEntityManager());
  } 

  async createPost(
    title: string,
    content: string,
    user: User,
    status: PostStatus,
    coverImage?: File
  ): Promise<Post | null> {
    const post = new Post();
    post.title = title;
    post.content = content;
    post.author = user;
    post.status = status;
    
    if (coverImage) {
      post.coverImage = coverImage;
    }

    await this.save(post);
    return this.findOne({
      where: { id: post.id },
      relations: ['author', 'coverImage'],
    });
  }

  async findByAuthor(
    query: PaginationQueryDto, 
    userId: string,
    filters: FilterQueryDto
  ): Promise<PaginatedResponse<Post>> {
    const queryBuilder = this.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.coverImage', 'coverImage')
      .where('author.id = :userId', { userId });

    if (filters.searchQuery) {
      const search = `%${filters.searchQuery}%`;
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where('LOWER(post.title) LIKE LOWER(:search)', { search })
          .orWhere('LOWER(post.content) LIKE LOWER(:search)', { search });
      }));
    }

    const [posts, total] = await queryBuilder
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .getManyAndCount();

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

  async searchPosts(query: string): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .where(
        `(LOWER(post.title) LIKE LOWER(:query) 
         OR LOWER(post.content) LIKE LOWER(:query))
         AND post.status = :status`,
        { query: `%${query}%`, status: 'published' }
      )
      .getMany();
  }

  async findRecent(limit: number): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC')
      .take(limit)
      .getMany();
  }
}

