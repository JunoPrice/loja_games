import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoController } from './controllers/produto.controller';
import { ProdutoService } from './services/produto.service';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
    controllers: [ProdutoController],
    providers: [ProdutoService],
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    exports: [TypeOrmModule],
})
export class ProdutoModule {};