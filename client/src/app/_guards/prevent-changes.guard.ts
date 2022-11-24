import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToolsEditAdminComponent } from '../admin-panel/tools/tools-edit-admin/tools-edit-admin.component';

@Injectable({
  providedIn: 'root'
})
export class PreventChangesGuard implements CanDeactivate<ToolsEditAdminComponent> {
  canDeactivate(component: ToolsEditAdminComponent): boolean {
    if (component.editForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
    }
    return true;
  }
  
}
