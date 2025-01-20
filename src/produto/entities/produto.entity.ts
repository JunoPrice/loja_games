import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numericTransformer";

@Entity({name: "tb_produtos"})
export class Produto {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 100, nullable: false})
    titulo: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string

    @Column()
    data_lancamento: Date

    @Column({type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer()})
    preco : number

    @Column({type: "varchar", length: 5000, nullable: true})
    foto : string


}