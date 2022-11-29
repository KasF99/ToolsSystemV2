import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Tool } from 'src/app/_models/tools';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-edit-admin',
  templateUrl: './tools-edit-admin.component.html',
  styleUrls: ['./tools-edit-admin.component.css']
})
export class ToolsEditAdminComponent implements OnInit {
  
  @ViewChild('editForm') editForm: NgForm | undefined
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = 'true';
    }
  }
  tool: Tool
  toolName: string
  user: User | null = null;

  constructor(public toolService: ToolService, public route: ActivatedRoute,
    public toastr: ToastrService, public router: Router, public accountService: AccountService)
  { this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user); }

  ngOnInit(): void {
    this.loadTool()
  }

  loadTool() {
    this.toolService.getTool(this.route.snapshot.paramMap.get('toolname')).subscribe(tool => {
      this.tool = tool
      this.toolName = this.tool.toolName
    })
  }

  updateTools() {
    this.toolService.updateTool(this.tool, this.toolName).subscribe(tool => {
      this.editForm?.reset(this.tool)
      this.router.navigateByUrl("/admin")
      this.toastr.success('Profile updated successfully');
    })
  }

}
