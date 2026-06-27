import { categoryCreateDTO } from './dtos/categoryCreateDTO';
import { PrismaService } from "../../prisma/prisma.service";
export declare class CategoriesService {
    private _prisma;
    constructor(_prisma: PrismaService);
    getCategoriesById(id: string): any;
    createCategory(category: categoryCreateDTO): Promise<any>;
    updateCategoryDetail(id: string, updatedDetail: Partial<categoryCreateDTO>): any;
    deleteCategory(id: string): any;
}
