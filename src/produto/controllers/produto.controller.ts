import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";

@Controller("/produtos")
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }

    @Get( )
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }
    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo') titulo: string): Promise<Produto[]>{
        return this.produtoService.findByTitulo(titulo);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }

    @Get('/preco/maior/:preco')
    @HttpCode(HttpStatus.OK)
    findByPrecoAsc(@Param('preco', ParseIntPipe) preco: number): Promise<Produto[]> {
        return this.produtoService.findByPrecoAsc(preco);
    }
    @Get('/preco/menor/:preco')
    @HttpCode(HttpStatus.OK)
    findByPrecoDesc(@Param('preco', ParseIntPipe) preco: number): Promise<Produto[]> {
        return this.produtoService.findByPrecoDesc(preco);
    }

}