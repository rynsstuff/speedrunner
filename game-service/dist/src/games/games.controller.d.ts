import { GamesService } from './games.service';
import { gameCreateDTO } from './dtos/gameCreateDTO';
export declare class GamesController {
    private _gameService;
    constructor(gameService: GamesService);
    getGames(): import("@prisma/client").Prisma.PrismaPromise<{
        game_name: string;
        description: string;
        game_id: string;
    }[]>;
    getGameById(game_id: string): import("@prisma/client").Prisma.Prisma__gamesClient<({
        run_categories: {
            game_id: string;
            run_category_name: string;
            run_category_id: string;
        }[];
    } & {
        game_name: string;
        description: string;
        game_id: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createGame(game: gameCreateDTO): import("@prisma/client").Prisma.Prisma__gamesClient<{
        game_name: string;
        description: string;
        game_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateGame(game_id: string, updatedGame: Partial<gameCreateDTO>): import("@prisma/client").Prisma.Prisma__gamesClient<{
        game_name: string;
        description: string;
        game_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteGame(game_id: string): import("@prisma/client").Prisma.Prisma__gamesClient<{
        game_name: string;
        description: string;
        game_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
