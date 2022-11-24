import { Tool } from "./tools";

export interface Member {
    id: number;
    username: string;
    created: Date;
    knownAs: string;
    email: string;
    tools: Tool[];
}