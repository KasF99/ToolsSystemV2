import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/paginations';
import { Tool } from '../_models/tools';
import { ToolsParams } from '../_models/toolsParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})

export class ToolService {
  baseUrl = environment.apiUrl
  tools: Tool[] = []

  isAdd: boolean
  isDelete: boolean
  isService: boolean
  paginatedResult: PaginatedResult<Tool[]> = new PaginatedResult<Tool[]>()
  toolCache = new Map();
  toolParams: ToolsParams;
  bsConfig: { containerClass: string; dateInputFormat: string; isAnimated: boolean; adaptivePosition: boolean; };

  constructor(public http: HttpClient, public toastr: ToastrService, public router: Router, public accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.toolParams = new ToolsParams();
      this.isAdd = false
      this.isDelete = false
      this.isService = false
      this.bsConfig = {
        containerClass: 'theme-dark-blue',
        dateInputFormat: "MM-DD-YYYY",
        isAnimated: true,
        adaptivePosition: true
      }
    })
  }

  getToolParams() {
    return this.toolParams;
  }

  setToolParams(params: ToolsParams) {
    this.toolParams = params;
  }

  resetToolParams() {
    this.toolParams = new ToolsParams();
    return this.toolParams
  }



  getTools(toolParams: ToolsParams, returnAll: boolean = false) {

    var response = this.toolCache.get(Object.values(toolParams).join('-'));

    if (response) {
      return of(response);
    }
    // if (returnAll) {
    //   return this.http.get(this.baseUrl + 'tools/?returnAll=true')
    // }

    else {
      let params = this.GetPaginationHeaders(toolParams.pageNumber, toolParams.pageSize);

      params = params.append('minDate', toolParams.dates[0].toDateString())
      params = params.append('maxDate', toolParams.dates[1].toDateString())
      params = params.append('owner', toolParams.owner)
      params = params.append('toolname', toolParams.toolname)
      params = params.append('orderBy', toolParams.orderBy)

      return this.GetPaginatedResult<Tool[]>(this.baseUrl + 'tools', params).pipe(map(response => {
        this.toolCache.set(Object.values(toolParams).join('-'), response);
        return response;
      }))
    }

  }


  getToolsAll() {
    return this.http.get<Tool[]>(this.baseUrl + 'tools/?returnAll=true')
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
    const tool = [...new Set(this.toolCache.values())]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((tool: Tool) => tool.toolName === toolname);
    if (tool) {
      return of(tool);
    }
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
    return this.http.put(this.baseUrl + 'tools/' + toolname + '/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number, toolname: string) {
    return this.http.delete(this.baseUrl + 'tools/' + toolname + '/delete-photo/' + photoId);
  }

  addTool(model: any, owner: string) {
    return this.http.post(this.baseUrl + 'users/' + owner + '/register-tool', model).pipe(
      map((tool: Tool) => {
        if (tool) {
          this.isAdd = true
        }
        return tool
      })
    )
  }

  deleteTool(owner: string, toolname: string) {
    return this.http.delete(this.baseUrl + 'users/' + owner + '/delete-tool/' + toolname).pipe(
      map(() => {
        {
          this.isDelete = true
        }
      })
    )
  }

  serviceTool(toolname: string, model: any) {
    return this.http.put(this.baseUrl + 'tools/' + toolname + '/service', model).pipe(
      map(() => {
        this.isService = true
      } 
      )
    )
  }



}
