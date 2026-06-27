import { CategoriesService } from './categories.service';
import { categoryCreateDTO } from './dtos/categoryCreateDTO';
export declare class CategoriesController {
    private _categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategoryById(run_category_id: string): any;
    createCategory(category: categoryCreateDTO): Promise<any>;
    updateCategoryDetail(id: string, updatedDetail: Partial<categoryCreateDTO>): any;
    deleteCategory(id: string): any;
}
