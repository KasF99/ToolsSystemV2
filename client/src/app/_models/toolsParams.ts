import { DateFormatter } from "ngx-bootstrap/datepicker"
import { Tool } from "./tools"

export class ToolsParams {
    public pageNumber = 1
    public pageSize = 10
    public minDate: Date = new Date('01-01-2000')
    public maxDate: Date = new Date('01-01-2050')

    constructor() {
     
    }
}
