import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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


  constructor(public http: HttpClient, public toastr: ToastrService ) { }

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

  deletePhoto(photoId: number, toolname: string) { 
    return this.http.delete(this.baseUrl + 'tools/' + toolname + '/delete-photo/' + photoId);
  }

  addTool(model: any, owner: string) {
    return this.http.post(this.baseUrl + 'users/' + owner + '/register-tool', model).pipe(
      map((tool: Tool) => {
        if (tool) {
          this.toastr.success("You added new user, for futher information and edit check TOOLS tab")
        }
        return tool
      })
    )
  }

  deleteTool(owner: string, toolname: string) {
    return this.http.delete(this.baseUrl + 'users/' + owner + '/delete-tool/' + toolname)
  }


}
