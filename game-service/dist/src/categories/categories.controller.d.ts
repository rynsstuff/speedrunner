import { CategoriesService } from './categories.service';
import { categoryCreateDTO } from './dtos/categoryCreateDTO';
export declare class CategoriesController {
    private _categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategoryById(run_category_id: string): import("@prisma/client").Prisma.Prisma__run_categoriesClient<{
        game_id: string;
        run_category_name: string;
        run_category_id: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createCategory(category: categoryCreateDTO): Promise<{
        game_id: string;
        run_category_name: string;
        run_category_id: string;
    }>;
    updateCategoryDetail(id: string, updatedDetail: Partial<categoryCreateDTO>): import("@prisma/client").Prisma.Prisma__run_categoriesClient<{
        game_id: string;
        run_category_name: string;
        run_category_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteCategory(id: string): import("@prisma/client").Prisma.Prisma__run_categoriesClient<{
        game_id: string;
        run_category_name: string;
        run_category_id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
