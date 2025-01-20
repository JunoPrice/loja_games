import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { Module } from "@nestjs/common";
import { CategoriaController } from "./controllers/categoria.controller";
import { CategoriaService } from "./services/categoria.service";

@Module({
    controllers: [CategoriaController],
    providers: [CategoriaService],
    imports: [TypeOrmModule.forFeature([Categoria])],
    exports: [TypeOrmModule, CategoriaService],
})
export class CategoriaModule {};