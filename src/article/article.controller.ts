import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guard/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponceInterface } from './types/articleResponse.interface';
import { ArticlesResponceInterface } from './types/articlesResponce.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponceInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponceInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponce(article);
  }

  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: any,
  ): Promise<ArticleResponceInterface> {
    const article = await this.articleService.findOneBySlug(slug);
    return this.articleService.buildArticleResponce(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @User('id') currentUserId: number,
    @Body('article') updateArticleDto: CreateArticleDto,
    @Param('slug') slug: string,
  ): Promise<ArticleResponceInterface> {
    const article = await this.articleService.updateArticle(
      currentUserId,
      updateArticleDto,
      slug,
    );
    return this.articleService.buildArticleResponce(article);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @User('id') @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponceInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId,
    );
    return this.articleService.buildArticleResponce(article);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @User('id') @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponceInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      slug,
      currentUserId,
    );
    return this.articleService.buildArticleResponce(article);
  }
}
