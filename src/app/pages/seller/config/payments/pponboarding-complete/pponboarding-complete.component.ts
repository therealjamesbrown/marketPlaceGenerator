import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pponboarding-complete',
  templateUrl: './pponboarding-complete.component.html',
  styleUrls: ['./pponboarding-complete.component.css']
})
export class PponboardingCompleteComponent implements OnInit {

  constructor(
    private router: Router,
               private activatedRoute : ActivatedRoute
  ) {
    console.log(this.queryData);
    
   }

  queryData: any = this.activatedRoute.snapshot.queryParams;
  
  

  ngOnInit(): void {
  }

}
