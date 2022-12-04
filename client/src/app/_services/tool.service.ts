import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, ReplaySubject, Subject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
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
  private currentToolsSource = new ReplaySubject<Tool[]>(1);
  currentTools$ = this.currentToolsSource.asObservable();
  version = 1
  lastversion = -1


  constructor(public http: HttpClient, public toastr: ToastrService, public router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  

  getTools() {
    if (this.tools.length > 0 && this.version == this.lastversion) return of(this.tools)
    this.lastversion = this.version
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
        this.version++
        const index = this.tools.indexOf(tool)
        this.tools[index] = { ...this.tools[index], ...tool }
      }
      )
    )
  }

  setMainPhoto(photoId: number, toolname: string) { 
    return this.http.put(this.baseUrl + 'tools/' + toolname + '/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number, toolname: string) { 
    return this.http.delete(this.baseUrl + 'tools/' + toolname + '/delete-photo/' + photoId);
  }

  addTool(model: any, owner: string) {
    return this.http.post(this.baseUrl + 'users/' + owner + '/register-tool', model).pipe(
      map((tool: Tool) => {
        this.version++
        if (tool) {
        
        }
        return tool
      })
    )
  }

  deleteTool(owner: string, toolname: string) {
    this.version++
    return this.http.delete(this.baseUrl + 'users/' + owner + '/delete-tool/' + toolname)
  }

  reloadPage(){
    this.router.navigateByUrl("/admin")
    window.location.reload()
  }

}
