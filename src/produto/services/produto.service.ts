import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find();
    }
    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            }
        });
        if (!produto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

        return produto;
    }
    async findByTitulo(titulo: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                titulo: ILike(`%${titulo}`)
            }
        })
    }
    async create(produto: Produto) : Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }
    async update(produto: Produto): Promise<Produto>{
        await this.findById(produto.id)

        return await this.produtoRepository.save(produto);
    }
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
        return await this.produtoRepository.delete(id)
    }

    async findByPrecoAsc(preco: number): Promise<Produto[]> { //desafio
        return await this.produtoRepository.find({
            where: {preco: MoreThan(preco)},
            order: {preco: "ASC"}
        });
        
    }

    async findByPrecoDesc(preco: number): Promise<Produto[]> { //desafio
        return await this.produtoRepository.find({
            where: {preco: LessThan(preco)},
            order: {preco: "DESC"}
        });
        
    }
}