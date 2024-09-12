import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from

    @Injectable()
    export class UserRepository {
        constructor( // fazendo a injeção dentro do construtor
            @InjectRepository(User)
            private readonly userRepository: Repository<User>,
        ) {}

        // o método sendo assíncrono será uma promessa e retorna uma lista
        // Métodos do TypeORM
        async findAll(): Promise<User[]> {
            // SELECT * FROM users;
            return await this.userRepository.find(); // método find
        }

        async save(user: User): Promise<User> { // entidade do tipo user
            // INSERT INTO
            return await this.userRepository.save(user); // quando salvar no banco vai salvar com uuid
        }


    }