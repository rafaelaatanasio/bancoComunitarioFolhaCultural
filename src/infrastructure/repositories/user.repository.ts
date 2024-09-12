//import { Injectable } from "@nestjs/common";
/*import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from

    @Injectable()
    export class UserRepository implements IUserRepository {
        constructor( // fazendo a injeção dentro do construtor
            @InjectRepository(User)
            private readonly userRepository: Repository<User>,
        ) { }

        // o método sendo assíncrono será uma promessa e retorna uma lista
        // Métodos do TypeORM
        async findAll(): Promise<User[]> {
            // SELECT * FROM users;
            return await this.userRepository.find(); // método find
        }

        async findById(id: string): Promise<User | null> {
            // SELECT * FROM users WHERE id: ?;
            return this.userRepository.findOne({
                where: { id },
                relations: ['address'],
            });
        }

        async save(user: User): Promise<User> { // entidade do tipo user
            // INSERT INTO
            return await this.userRepository.save(user); // quando salvar no banco vai salvar com uuid
        }

        async listUsers(): Promise<User[]> {
            return await this.userRepository.findAll();
        }

        async delete(id: string): Promise<boolean> {
            const result = await this.userRepository.delete(id);
            return result.affected > 0;
        }
    }*/