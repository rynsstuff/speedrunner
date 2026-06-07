import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, runs } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { runCreateDTO } from './dtos/runCreateDTO';

@Injectable()
export class RunsService {

    constructor(private readonly _prisma: PrismaService) {}

    async getRunsByCategory(id: string) {
        try {
            const res = await fetch(`http://localhost:3001/categories/${id}`);

            if (!res.ok) {
                throw new NotFoundException('Category not found');
            }

            return this._prisma.runs.findMany({
                where: {
                    run_category_id: id,
                    status: 'ACCEPTED'
                },
                orderBy: {
                    run_duration: 'asc'
                }
            });
        } catch (err) {
            console.error(err);
            throw err
        }
    }

    async getRunsByUser(id: string, authId: string): Promise<runs[]> {
        if (id !== authId) {
            return this._prisma.runs.findMany({
                where: {
                    user_id: id,
                    status: 'ACCEPTED'
                }
            });
        }

        return this._prisma.runs.findMany({
            where: {
                user_id: id
            }
        });
    }

    async getRunById(id: string): Promise<runs | null> {
        const run = await this._prisma.runs.findUnique({
            where: { run_id: id }
        });

        if (!run) {
            throw new NotFoundException('Run not found');
        }

        return run;
    }

    async createNewRunEntry(body: runCreateDTO, userId: string): Promise<{ message: string; data: runs }> {
        const res = await fetch(`http://localhost:3001/categories/${body.run_category_id}`);

        if (!res.ok) {
            throw new NotFoundException('Run category does not exist');
        }

        const createdRun = await this._prisma.runs.create({
            data: {
                run_category_id: body.run_category_id,
                vod_url: body.vod_url,
                run_duration: body.run_duration,
                status: 'PENDING',
                user_id: userId,
                submitted_at: new Date(),
                verified_at: new Date(),
            }
        });

        return {
            message: 'Successfully created a new run entry',
            data: createdRun
        };
    }

    getRunsByStatus(status: string): Promise<runs[]> {
        return this._prisma.runs.findMany({
            where: { status }
        });
    }

    updateRunStatus(runId: string, status: string): Promise<runs> {
        return this._prisma.runs.update({
            data: {
                status,
                verified_at: new Date()
            },
            where: { run_id: runId }
        });
    }
}