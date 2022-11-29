import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { Tool } from 'src/app/_models/tools';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ToolService } from 'src/app/_services/tool.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editot-admin',
  templateUrl: './photo-edit-admin.component.html',
  styleUrls: ['./photo-edit-admin.component.css']
})
export class PhotoEditotAdminComponent implements OnInit {
  @Input() tool: Tool | undefined
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | null = null;
  member: Member;
  accountService: AccountService;

  constructor(private toolService: ToolService, public route: ActivatedRoute) {
   this.initializeUser()
  }

  ngOnInit(): void {
    this.loadTool()
    this.initializeUploader()
  }

  loadTool() {
    this.toolService.getTool(this.route.snapshot.paramMap.get('toolname')).subscribe(tool => {
      this.tool = tool
    })
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }



  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'tools/' + this.tool.toolName + '/add-photo',
      authToken: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
      // authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.tool.photos.push(photo);
      }
    }
  }

  initializeUser() {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }


}
