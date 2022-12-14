import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Tool } from 'src/app/_models/tools';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-detail',
  templateUrl: './tools-detail.component.html',
  styleUrls: ['./tools-detail.component.css']
})
export class ToolsDetailComponent implements OnInit {
  tool: Tool
  closeToService: boolean = false
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(public toolService: ToolService, public route: ActivatedRoute) { }

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
    console.log(this.tool.serviceDate)
    console.log(this.closeToService)
  }
  

}
