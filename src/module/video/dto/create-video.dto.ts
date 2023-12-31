import { IsNumber, IsString,IsNotEmpty } from "class-validator";

export class CreateVideoDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsNumber()
    channelId: number;
  
    @IsNotEmpty()
    tagId: number;
  
}
