import { Injectable } from '@angular/core';
import { BookDetails } from './book-details';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelserviceService {

  constructor(private http : HttpClient) { }


  refresh = new Subject<void>();
  get Refresh(){
    return this.refresh;
  }
  bookDetails : BookDetails[] = [];
  url1 = "http://localhost:8088/"

  // to return all excel entries stored in db
  getAllExcelData() : Observable<BookDetails[]>{
    return this.http.get<BookDetails[]>(this.url1+"allBooks");
  }

  // uploading excel file and implementing live refresh of data
  uploadExcelFile(formData : FormData){
      this.http.post<any>(this.url1+"books/upload",formData).pipe(tap(()=>this.Refresh.next())).subscribe();
    }
}
