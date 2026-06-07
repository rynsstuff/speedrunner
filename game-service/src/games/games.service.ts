import { Injectable } from '@nestjs/common';
import { gameCreateDTO } from './dtos/gameCreateDTO';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GamesService {
    constructor(private _prisma: PrismaService){}

    getGames(){
        return this._prisma.games.findMany();
    }

    getGameById(id: string){
        return this._prisma.games.findUnique({
            where: { game_id: id },
            include: { run_categories: true }
        });
    }

    createGame(game: gameCreateDTO){
        if (!game.game_name || !game.description){
            throw new Error('Game name and description must be filled');
        }
        return this._prisma.games.create({
            data: {
                game_name: game.game_name,
                description: game.description,
            }
        });
    }

    updateGame(id: string, updatedGame: Partial<gameCreateDTO>){
        return this._prisma.games.update({
            where: { game_id: id },
            data: {
                game_name: updatedGame.game_name,
                description: updatedGame.description,
            }
        });
    }

    deleteGame(id: string){
        return this._prisma.games.delete({
            where: { game_id: id }
        });
    }
}