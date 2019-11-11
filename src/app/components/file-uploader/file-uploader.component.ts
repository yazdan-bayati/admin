import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileService } from '../../services/file.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Hotel, Room } from '../../models/hotel';
class ImageSnippet {
  constructor(public src: string, public file: File
  ) { }
}
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  fileToUpload: File = null;

  form: FormGroup;
  model: Hotel = new Hotel();
  selectedFile: ImageSnippet;
  url = 'http://localhost:5000/image/';
  files = [];

  constructor(private fileService: FileService,
    private fb: FormBuilder) { }

  onSubmit() {
    if (this.form.valid) {
      const hotel = this.form.value as Hotel;
      hotel.mainImage = this.model.mainImage;
      hotel.searchResultImage = this.model.searchResultImage;
      hotel.topSearch1 = this.model.topSearch1;
      hotel.topSearch2 = this.model.topSearch2;
      hotel.topSearch3 = this.model.topSearch3;
      hotel.firstDetailImage = this.model.firstDetailImage;
      hotel.secondDetailImage = this.model.secondDetailImage;
      hotel.thirdDetailImage = this.model.thirdDetailImage;

      this.fileService.addHotel(hotel).subscribe(res => {
        debugger;
      });
    }
  }


  handleFileInput(imageInput: any, resultHolder: string) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.fileService.uploadImage(this.selectedFile.file).subscribe(
        res => {
          this.model[resultHolder] = this.url + res.file.filename;
        })
    });

    reader.readAsDataURL(file);
  }
  ngOnInit() {

    this.createForm();

    this.fileService.showFileNames().subscribe(response => {
      for (let i = 0; i < response['length']; i++) {
        this.files[i] = {
          filename: response[i].filename,
          url: 'http://localhost:5000/image/' + response[i].filename,
          contentType: response[i].contentType
        };
      }
    });

  }

  private createForm(data?: Hotel) {
    this.form = this.fb.group({
      title: [data ? data.title : ''],
      address: [data ? data.address : ''],
      country: [data ? data.country : ''],
      city: [data ? data.city : ''],
      webSite: [data ? data.webSite : ''],
      desciption: [data ? data.desciption : ''],
      rate: [data ? data.rate : ''],
      price: [data ? data.price : ''],
      doubleRoomPrice: [data ? data.doubleRoomPrice : ''],
      popular: [data ? data.popular : ''],
      hot: [data ? data.hot : ''],
      wifi: [data ? data.wifi : ''],
      parking: [data ? data.parking : ''],
      airportShuttle: [data ? data.airportShuttle : ''],
      restaurant: [data ? data.restaurant : ''],
      checkinHour: [data ? data.checkinHour : ''],
      checkouHour: [data ? data.checkouHour : ''],
      countryCode: [data ? data.countryCode : ''],
      overviewTxt: [data ? data.overviewTxt : ''],
      discount: [data ? data.discount : ''],
      phone: [data ? data.phone : ''],
      numberOfRooms: [data ? data.numberOfRooms : ''],
      rooms: this.fb.array([])

    });

    if (data) {
      data.rooms.map(room => {
        this.addRoom(room);
      })
    }
  }

  get roomForms() {
    return this.form.controls.rooms.value;
  }

  addRoom(data?: Room) {
    const roomforms = this.form.controls.rooms as FormArray;
    roomforms.push(this.fb.group({
      roomNumber: [data ? data.roomNumber : ''],
      type: [data ? data.type : '']
    }))
  }

  filDemoData() {
    const hotel = new Hotel();
    hotel.fillDemoData();
    this.createForm(hotel);
  }


}
