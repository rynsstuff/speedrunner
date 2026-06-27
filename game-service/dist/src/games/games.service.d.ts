import { gameCreateDTO } from './dtos/gameCreateDTO';
import { PrismaService } from "../../prisma/prisma.service";
export declare class GamesService {
    private _prisma;
    constructor(_prisma: PrismaService);
    getGames(): any;
    getGameById(id: string): any;
    createGame(game: gameCreateDTO): any;
    updateGame(id: string, updatedGame: Partial<gameCreateDTO>): any;
    deleteGame(id: string): any;
}
