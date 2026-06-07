"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    _prisma;
    constructor(_prisma) {
        this._prisma = _prisma;
    }
    getCategoriesById(id) {
        return this._prisma.run_categories.findUnique({
            where: { run_category_id: id }
        });
    }
    async createCategory(category) {
        const game = await this._prisma.games.findUnique({
            where: { game_id: category.game_id }
        });
        if (!game) {
            throw new Error('Game not found');
        }
        return this._prisma.run_categories.create({
            data: {
                game_id: category.game_id,
                run_category_name: category.run_category_name,
            }
        });
    }
    updateCategoryDetail(id, updatedDetail) {
        return this._prisma.run_categories.update({
            where: { run_category_id: id },
            data: {
                game_id: updatedDetail.game_id,
                run_category_name: updatedDetail.run_category_name,
            }
        });
    }
    deleteCategory(id) {
        return this._prisma.run_categories.delete({
            where: { run_category_id: id }
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map