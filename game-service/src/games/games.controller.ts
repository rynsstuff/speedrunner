import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { gameCreateDTO } from './dtos/gameCreateDTO';
import { RolesGuard } from '../auth/roles/roles.guard';
import { JwtAuthGuard } from '../auth/roles/jwt.auth.guard';

@Controller()
export class GamesController {
    private _gameService: GamesService;
    constructor(gameService: GamesService){
        this._gameService = gameService;
    }

    @Get('games')
    getGames(){
       return this._gameService.getGames(); 
    }

    @Get('games/:id')
    getGameById(@Param('id') game_id: string){
        return this._gameService.getGameById(game_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('admin/games')
    createGame(@Body() game: gameCreateDTO){
        return this._gameService.createGame(game);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('admin/games/:id/update')
    updateGame(@Param('id') game_id: string, @Body() updatedGame: Partial<gameCreateDTO>){
        return this._gameService.updateGame(game_id, updatedGame)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('admin/games/:id/delete')
    deleteGame(@Param('id') game_id: string){
        return this._gameService.deleteGame(game_id)
    }
}
