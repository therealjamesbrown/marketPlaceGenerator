import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';




export class GlobalConstants {


    constructor(private cookieService: CookieService) { 
      
    }
    
    public static merchantIdInPayPal: string = "U57ZJ9YCTLNA4"
    public static paypalClientId: string = "AWWarvYmG1fqjxQEsJPjOZoaH6s9-UHj_6yjcmvjZm8VL6YG1606X45O9QtlfIz8EMe-6ftLGyDC09ot";
}