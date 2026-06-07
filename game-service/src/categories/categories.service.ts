import { Injectable} from '@nestjs/common';
import { categoryCreateDTO } from './dtos/categoryCreateDTO';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private _prisma: PrismaService){}

    getCategoriesById(id: string){
        return this._prisma.run_categories.findUnique({
            where: {run_category_id: id}
        });
    }

    async createCategory(category: categoryCreateDTO){
        const game = await this._prisma.games.findUnique({
            where: {game_id: category.game_id}
        });

        if (!game){
            throw new Error('Game not found');
        }

        return this._prisma.run_categories.create({
            data: {
                game_id: category.game_id,
                run_category_name: category.run_category_name,
            }
        });
    }

    updateCategoryDetail(id: string, updatedDetail: Partial<categoryCreateDTO>){
       return this._prisma.run_categories.update({
            where: {run_category_id: id},
            data: {
                game_id: updatedDetail.game_id,
                run_category_name:  updatedDetail.run_category_name,
            }
       });
    }

    deleteCategory(id: string){
        return this._prisma.run_categories.delete({
            where: {run_category_id: id}
        });
    }
}
