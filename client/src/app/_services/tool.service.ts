import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tool } from '../_models/tools';

// const httpOptions = {
//   headers: new HttpHeaders({ Authorization: 'Bearer ' +JSON.parse(localStorage.getItem('user'))?.token})
// }


@Injectable({
  providedIn: 'root'
})
  
export class ToolService {
  baseUrl = environment.apiUrl
  tool: Tool

  constructor(public http: HttpClient) { }

  getTools() {
    return this.http.get<Tool[]>(this.baseUrl + 'tools')
  }

  getTool(toolname: string) {
    return this.http.get<Tool>(this.baseUrl + 'tools/'+ toolname)
  }

  updateTool(tool: Tool, toolname: string) {
    return this.http.put<Tool>(this.baseUrl + 'tools/' + toolname, tool)
  }
}
