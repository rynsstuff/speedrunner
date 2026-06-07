import { gameCreateDTO } from './dtos/gameCreateDTO';
import { PrismaService } from "../../prisma/prisma.service";
export declare class GamesService {
    private _prisma;
    constructor(_prisma: PrismaService);
    getGames(): import("@prisma/client").Prisma.PrismaPromise<{
        game_name: string;
        description: string;
        game_id: string;
    }[]>;
    getGameById(id: string): import("@prisma/client").Prisma.Prisma__gamesClient<({
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
    updateGame(id: string, updatedGame: Partial<gameCreateDTO>): import("@prisma/client").Prisma.Prisma__gamesClient<{
        game_name: string;
        description: string;
        game_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteGame(id: string): import("@prisma/client").Prisma.Prisma__gamesClient<{
        game_name: string;
        description: string;
        game_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
