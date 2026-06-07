/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";

export class commentCreateDTO {
    @ApiProperty()
    run_id!: string;

    @ApiProperty()
    comment!: string;

    @ApiProperty()
    user_id: any;
}