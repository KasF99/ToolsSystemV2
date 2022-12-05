import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/paginations';
import { Tool } from '../_models/tools';
import { ToolsParams } from '../_models/toolsParams';

// const httpOptions = {
//   headers: new HttpHeaders({ Authorization: 'Bearer ' +JSON.parse(localStorage.getItem('user'))?.token})
// }


@Injectable({
  providedIn: 'root'
})

export class ToolService {
  baseUrl = environment.apiUrl
  tools: Tool[] = []

  version = 1
  lastversion = -1
  paginatedResult: PaginatedResult<Tool[]> = new PaginatedResult<Tool[]>()

  constructor(public http: HttpClient, public toastr: ToastrService, public router: Router) { }


  // getTools() {
  //   if (this.tools.length > 0 && this.version == this.lastversion) return of(this.tools)
  //   this.lastversion = this.version
  //   return this.http.get<Tool[]>(this.baseUrl + 'tools').pipe(
  //     map(tools => {
  //       this.tools = tools
  //       return this.tools
  //     })
  //   )
  // }



  getTools(toolParams: ToolsParams) {
    let params = this.GetPaginationHeaders(toolParams.pageNumber, toolParams.pageSize);

    params = params.append('minDate', toolParams.minDate.toDateString())
    params = params.append('maxDate', toolParams.maxDate.toDateString())


    return this.GetPaginatedResult<Tool[]>(this.baseUrl + 'tools', params)
  }

  private GetPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private GetPaginationHeaders(page: number, itemsPerPage: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
    return params;

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

}
