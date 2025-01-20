import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations:{
                categoria: true
            }
        });
    }
    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations:{
                categoria: true
            }
        });
        if (!produto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

        return produto;
    }
    async findByTitulo(titulo: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                categoria: true
            }
        })
    }
    async create(produto: Produto) : Promise<Produto> {
        await this.categoriaService.findById(produto.categoria.id)
        return await this.produtoRepository.save(produto);
    }
    async update(produto: Produto): Promise<Produto>{
        await this.findById(produto.id)
        await this.categoriaService.findById(produto.categoria.id)

        return await this.produtoRepository.save(produto);
    }
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
        return await this.produtoRepository.delete(id)
    }

    async findByPrecoAsc(preco: number): Promise<Produto[]> { //desafio
        return await this.produtoRepository.find({
            where: {preco: MoreThan(preco)},
            order: {preco: "ASC"},
            relations:{
                categoria: true
            }
        });
        
    }

    async findByPrecoDesc(preco: number): Promise<Produto[]> { //desafio
        return await this.produtoRepository.find({
            where: {preco: LessThan(preco)},
            order: {preco: "DESC"},
            relations:{
                categoria: true
            }
        });
        
    }
}