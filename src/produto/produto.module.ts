import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoController } from './controllers/produto.controller';
import { ProdutoService } from './services/produto.service';

@Module({
    controllers: [ProdutoController],
    providers: [ProdutoService],
    imports: [TypeOrmModule.forFeature([Produto])],
    exports: [],
})
export class ProdutoModule {};