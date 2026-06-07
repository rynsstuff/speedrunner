/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";

export class runCreateDTO {
    @ApiProperty()
    run_category_id!: string;
    @ApiProperty()
    vod_url!: string;
    @ApiProperty()
    run_duration!: bigint;

}