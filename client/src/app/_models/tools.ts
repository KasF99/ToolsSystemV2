import { Photo } from "./photo";
import { ToolProperties } from "./toolProperties";

export interface Tool {
    id: number;
    toolNumber: string;
    toolName: string;
    owner: string;
    photoUrl: string;
    description: string;
    created: Date;
    dateOfService: Date;
    serviceDate: number;
    photos: Photo[];
    toolProperties: ToolProperties
}