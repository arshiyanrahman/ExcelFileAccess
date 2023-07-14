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

  // displaying all the books stored in db   
    this.getAll();
    //to perform live refresh
    this.excelService.Refresh.subscribe((response) =>
    this.getAll())
  }

  // storing excel file uploaded in this.file 
  selectFile(event : Event){
       this.file = (event.target as HTMLInputElement)?.files?.[0];
    }
    
    // method to upload selected file 
  uploadFile(){
  let formData = new FormData();
  console.log(this.file);
  
  // appending file uploaded at the end of formData
  formData.append("file",this.file);
  // uploading formdata to database
  this.excelService.uploadExcelFile(formData);
   }

   // method to get all books stored in db
   getAll(){
    this.excelService.getAllExcelData().toPromise().then(result => this.excelDetails = result)
   }
}
