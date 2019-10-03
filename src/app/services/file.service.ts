import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';



@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
    
   }

   showFileNames() {
    return this.http.get('http://127.0.0.1:5000/files');
  }

  getHotels() {
    return this.http.get('http://127.0.0.1:5000/hotel');
  }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'http://127.0.0.1:5000/upload';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData);  
      
}

uploadImage(image: File): Observable<any> {
  const formData = new FormData();

  formData.append('file', image);

  return this.http.post('http://127.0.0.1:5000/upload', formData);
}

  
  addHotel(hotel:Hotel): Observable<any> {
    return this.http.post<any>(
      'http://127.0.0.1:5000/hotel', JSON.stringify(hotel), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  //  downloadPDF(filename, filetype): any {
  //   return this.http.get('http://127.0.0.1:3000/file/' + filename,
  //   { responseType: '' });
  // }
}
