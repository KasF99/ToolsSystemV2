import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import jspdf from 'jspdf';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import { Tool } from 'src/app/_models/tools';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToolService } from 'src/app/_services/tool.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pdf-comp-admin',
  templateUrl: './pdf-comp-admin.component.html',
  styleUrls: ['./pdf-comp-admin.component.css']
})
export class PdfCompAdminComponent implements OnInit {

  // @ViewChild('pdf') pdf: ElementRef;
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  pipe = new DatePipe('en-US');
  tDate: Date = new Date();
  tool: Tool
  PDFDate: string

  constructor(public toolService: ToolService, public route: ActivatedRoute,
    public toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.loadTool()
  }

  loadTool() {
    this.toolService.getTool(this.route.snapshot.paramMap.get('toolname')).subscribe(tool => {
      this.tool = tool
      this.PDFDate = this.pipe.transform(this.tDate, 'ddMMyyhhmma');
    })
  }


  title = 'htmltopdf';


  // public downloadAsPDF() {
  //   const pdf = this.pdf.nativeElement;
  //   var html = htmlToPdfmake(pdf.innerHTML);
  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).open();

  // }

  // fileName() {
  //   const element = document.getElementById('my-element');
  //   const pdf = new jspdf();

  //   pdf.html(element, () => {
  //     pdf.save('my-pdf.pdf');
  //   });
  // }


  // htmlToPdf() {
  //   const doc = new jsPDF('letter')
  //   const ta = document.getElementById('pdfSink');
  //   doc.fromHTML(ta, 0, 0);
  //   doc.save('demo.pdf')
  // }

  downloadAsPDF() {
    let div = this.pdfTable.nativeElement;
    let fileName = this.PDFDate

    var img: any;
    var filename;
    var newImage: any;

    domtoimage.toJpeg(div, { bgcolor: '#fff' })

      .then(function (dataUrl) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function () {

          var pdfWidth = img.width;
          var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;
          var datepipe;

          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
          }
          else {
            doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
          }

          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();

          doc.addImage(newImage, 'SVG', 0, 0, width, height);
          filename = fileName + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function (error) {

        // Error Handling

      });
  }


  returnAnwser(val: boolean) {
    if (val === true) {
      return true
    }

    if (val === false) {
      return false
    }

    else {
      return null
    }
  }






}
