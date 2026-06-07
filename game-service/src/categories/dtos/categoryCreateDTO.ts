import { ApiProperty } from "@nestjs/swagger";


export class categoryCreateDTO{
    @ApiProperty()
    game_id: string;
    @ApiProperty()
    run_category_name: string;
}