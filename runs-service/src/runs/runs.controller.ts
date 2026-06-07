import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { RunsService } from './runs.service';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { UserGuard } from 'src/auth/user/user.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { runCreateDTO } from './dtos/runCreateDTO';

@Controller('runs')
export class RunsController {
    constructor(private readonly _runsService: RunsService) {}

    @Get(':id/category')
    async getRunsByCategory(@Param('id') id: string) {
        return this._runsService.getRunsByCategory(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/user')
    async getRunsByUser(@Param('id') id: string, @Request() req: any) {
        return this._runsService.getRunsByUser(id, req.user.userId);
    }

    @Get(':id')
    async getRunById(@Param('id') id: string) {
        return this._runsService.getRunById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createNewRunEntry(@Body() body: runCreateDTO, @Request() req: any) {
        return this._runsService.createNewRunEntry(body, req.user.userId);
    }
}

@Controller('admin/runs')
export class AdminRunsController {
    constructor(private readonly _runsService: RunsService) {}

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get(':status')
    async getRunsByStatus(@Param('status') status: string) {
        return this._runsService.getRunsByStatus(status);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post(':id/accept')
    async acceptRunEntry(@Param('id') id: string) {
        return this._runsService.updateRunStatus(id, 'ACCEPTED');
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post(':id/reject')
    async rejectRunEntry(@Param('id') id: string) {
        return this._runsService.updateRunStatus(id, 'REJECTED');
    }
}