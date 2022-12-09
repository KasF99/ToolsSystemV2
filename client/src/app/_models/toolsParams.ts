import { DatePipe } from "@angular/common"
import { DateFormatter } from "ngx-bootstrap/datepicker"
import { Tool } from "./tools"

export class ToolsParams {
    public pageNumber = 1
    public pageSize = 20
    public dates: Date[] = [new Date(new Date().setFullYear(new Date().getFullYear() - 2)), new Date(new Date().setFullYear(new Date().getFullYear() + 2))]
    public owner: string = ""
    public toolname: string = ""
    orderBy = 'dateOfService'

    constructor() {

    }
}
