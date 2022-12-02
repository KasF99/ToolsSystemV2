import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { Tool } from 'src/app/_models/tools';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-detail-admin',
  templateUrl: './tools-detail-admin.component.html',
  styleUrls: ['./tools-detail-admin.component.css']
})
export class ToolsDetailAdminComponent implements OnInit {

  tool: Tool
  closeToService: boolean = false
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
 

  constructor(public toolService: ToolService, public route: ActivatedRoute,
    public toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.loadTool()

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

    
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.tool.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadTool() {
    this.toolService.getTool(this.route.snapshot.paramMap.get('toolname')).subscribe(tool => {
      this.tool = tool
      this.galleryImages = this.getImages();
      this.close()
    })
  }

  close() {
    if (this.tool.serviceDate < 20) {
      this.closeToService = true
  }
  }

  // delete() {
  //   this.toolService.deleteTool(this.tool.owner, this.tool.toolName).subscribe( () => {
  //          this.router.navigateByUrl("/admin")
  //   })
  // }

 

}
