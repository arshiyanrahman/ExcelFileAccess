import { Component } from '@angular/core';
import { ExcelserviceService } from '../excelservice.service';
import { BookDetails } from '../book-details';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  constructor(private excelService : ExcelserviceService ){}
  file : any;
  excelDetails : BookDetails[] | undefined =[] ;
  ngOnInit(){
  //   console.log("ngOnInit");
  //  this.excelService.getAllExcelData().subscribe((resp : BookDetails[])=>{
  // this.excelDetails  = resp;
      
  //   });
    this.getAll();
    this.excelService.Refresh.subscribe((response) =>
    this.getAll())
  }

  selectFile(event : Event){
       this.file = (event.target as HTMLInputElement)?.files?.[0];
    }
    
  uploadFile(){
  let formData = new FormData();
  console.log(this.file);
  
  formData.append("file",this.file);
  this.excelService.uploadExcelFile(formData);
   }

   getAll(){
    this.excelService.getAllExcelData().toPromise().then(result => this.excelDetails = result)
   }
}
