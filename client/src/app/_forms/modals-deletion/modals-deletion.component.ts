import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Tool } from 'src/app/_models/tools';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-modals-deletion',
  templateUrl: './modals-deletion.component.html',
  styleUrls: ['./modals-deletion.component.css']
})
export class ModalsDeletionComponent {
  @Input() tool: Tool
  modalRef?: BsModalRef;
  toolname: string = ''

  constructor(private modalService: BsModalService, public toolService: ToolService, public route: ActivatedRoute,
    public toastr: ToastrService, public router: Router) { 
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }

  delete() {
    this.toolService.deleteTool(this.tool.owner, this.tool.toolName).subscribe(() => {
      this.modalRef?.hide();
      // window.location.replace("/admin")
      this.toastr.info("You deleted " + this.tool.toolName + ", going back to the Tool list")
    })
  }

}
