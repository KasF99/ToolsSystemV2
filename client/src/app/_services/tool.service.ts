import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
  tools: Tool[] = []


  constructor(public http: HttpClient) { }

  getTools() {
    if (this.tools.length > 0) return of(this.tools)
    return this.http.get<Tool[]>(this.baseUrl + 'tools').pipe(
      map(tools => {
        this.tools = tools
        return this.tools
      })
    )
  }

  getTool(toolname: string) {
    const tool = this.tools.find(x => x.toolName === toolname)
    if (tool) return of(tool);
    return this.http.get<Tool>(this.baseUrl + 'tools/' + toolname)
  }

  updateTool(tool: Tool, toolname: string) {
    return this.http.put<Tool>(this.baseUrl + 'tools/' + toolname, tool).pipe(
      map(() => {
        const index = this.tools.indexOf(tool)
        this.tools[index] = { ...this.tools[index], ...tool }

      }
      )
    )
  }

  setMainPhoto(photoId: number, toolname: string) { 
    return this.http.put(this.baseUrl + 'tools/' + toolname + '/set-main-photo/' + photoId, {});
  }


}
