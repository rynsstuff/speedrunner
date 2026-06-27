import { GamesService } from './games.service';
import { gameCreateDTO } from './dtos/gameCreateDTO';
export declare class GamesController {
    private _gameService;
    constructor(gameService: GamesService);
    getGames(): any;
    getGameById(game_id: string): any;
    createGame(game: gameCreateDTO): any;
    updateGame(game_id: string, updatedGame: Partial<gameCreateDTO>): any;
    deleteGame(game_id: string): any;
}
