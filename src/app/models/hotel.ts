

export class Hotel {
    /**
     *
     */
    constructor() {
    }
    id: number;
    title: string;
    searchResultImage: string;
    topSearch1: string;
    topSearch2: string;
    topSearch3: string;
    firstDetailImage:string;
    secondDetailImage:string;
    thirdDetailImage:string;
    mainImage: string;
    country: string;
    city: string;
    location?: string;
    numberOfRooms: number;
    checkinTime: string;
    checkoutTime: string;
    address: string;
    phone: string;
    webSite: string;
    wifi: boolean;
    desciption: string;
    rate: number;
    doubleRoomPrice:number;
    price: number;
    orginalPrice:number;
    popular: boolean;
    hot: boolean;
    discount: number;
    parking:boolean;
    airportShuttle:boolean;
    restaurant:boolean;
    overviewTxt:string;
    checkinHour:string;
    checkouHour:string;
    countryCode:string;
    rooms:Room[] = [];

    fillDemoData(){
        this.title = "demo Hotel";
        this.hot = true;
        this.numberOfRooms = 200;
        this.orginalPrice = 400;
        this.overviewTxt = 'this hotel located in norh of theran and its contain parking , airpoer shatel and many more facilites and if you want to spend wonderful days you should choice this hotel and enjoy your stay in tehran ';
        this.parking = true;
        this.phone = '887789887';
        this.popular = true;
        this.price = 400;
        this.rate = 4;
        this.restaurant = false;
        this.webSite = 'www.demo.com';
        this.wifi = false;
        this.address = 'main street';
        this.airportShuttle = false;
        this.checkinHour = '11 am';
        this.checkouHour = '3 pm';
        this.city = 'tehran';
        this.country = 'iran';
        this.countryCode  = '98';
        this.desciption = 'it one of the best hotel in Iran ';
        this.discount = 350;
        this.doubleRoomPrice = 450;
        const room1 = new Room();
        room1.isBooked = false;
        room1.roomNumber = 1;
        room1.type = RoomType.single;

        const room2 = new Room();
        room2.isBooked = true;
        room2.roomNumber = 2;
        room2.type = RoomType.double;

        this.rooms.push(room1);
        this.rooms.push(room2);
    }
}

export class Room{
   roomNumber:number;
   type:RoomType;
   isBooked:boolean = false;
   checkinTime?:Date;
   chekoutTime?:Date;
}

export enum RoomType{
    single = 1,
    double = 2
}
