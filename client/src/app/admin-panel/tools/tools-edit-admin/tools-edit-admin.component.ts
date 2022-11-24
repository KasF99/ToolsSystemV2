import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tool } from 'src/app/_models/tools';
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

  constructor(public toolService: ToolService, public route: ActivatedRoute,
    public toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.loadTool()
  }

  loadTool() {
    this.toolService.getTool(this.route.snapshot.paramMap.get('toolname')).subscribe(tool => {
      this.tool = tool
    })

  }

  updateTools() {
    this.toolService.updateTool(this.tool, this.tool.toolName).subscribe(() => {
      this.editForm?.reset(this.tool)
      this.toastr.success('Profile updated successfully');
    })
  }

}
