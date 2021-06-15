import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserprofileService } from 'src/app/pages/services/userprofile.service';
import { CookieService } from 'ngx-cookie-service';
import { SellerService } from 'src/app/shared/base-layout/create-seller/seller.service';


@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styleUrls: ['./create-seller.component.css']
})
export class CreateSellerComponent implements OnInit {

      //init the arryas for our security questions. One that pulls all security questions, then one that filters out disabled ones
      securityQuestionsDataSource: any[];
      filteredSecurityQuestionsDataSource: any[];

  constructor(private userProfileService: UserprofileService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cookieService: CookieService, 
    private sellerService: SellerService,
    @Inject(MAT_DIALOG_DATA) data
    ) { 
      this.userProfileService.getAllSecurityQuestions().subscribe(res =>{
    
        //get all the security questions and set it to our initial data array
        this.securityQuestionsDataSource = res.data;
  
        //Initialize the new array, filter out the disabled ones, and pushed the active ones into the new array
        this.filteredSecurityQuestionsDataSource = [];
        for (let question of this.securityQuestionsDataSource){
          if(question.isDisabled !== true){
            this.filteredSecurityQuestionsDataSource.push(question);
          } 
        }
        //console.log(this.filteredSecurityQuestionsDataSource);
      })
    }

    //bring in our interface
text: any;
createSellerForm: FormGroup;
enteredText:any [];
//get the marketplace ID that is registering the seller
marketplaceId;

//industry. move this to values stored in a db later on....
industryDataSource: any[] = [
  {
    value: 'Home',
  },
  {
    value: 'Fashion',
  },
  {
    value: 'Medicine',
  }
];
ngOnInit(): void {
  this.createSellerForm = this.fb.group({
    username: ['', Validators.required],
    businessName: ['', Validators.required],
    industry: ['', Validators.required],
    type: [{value: 'Seller', disabled: true}, Validators.required],
    contactFirstName: ['', Validators.required],
    contactLastName: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    securityQuestionSeletedOne: [null, Validators.compose([Validators.required])],
    securityQuestionOneAnswer: [null, Validators.compose([Validators.required])],
    securityQuestionSeletedTwo: [null, Validators.compose([Validators.required])],
    securityQuestionTwoAnswer: [null, Validators.compose([Validators.required])],
    securityQuestionSeletedThree: [null, Validators.compose([Validators.required])],
    securityQuestionThreeAnswer: [null, Validators.compose([Validators.required])]
  })
}
  //create the Seller object by grabbing form values and post it to the api with the Seller service
 createSeller(){

  //create the array of objects for the security questions.
  const dangSecurityQuestions = [
    {
      questionText: this.createSellerForm.controls.securityQuestionSeletedOne.value,
      answerText: this.createSellerForm.controls.securityQuestionOneAnswer.value
    },
    {
      questionText: this.createSellerForm.controls.securityQuestionSeletedTwo.value,
      answerText: this.createSellerForm.controls.securityQuestionTwoAnswer.value
    },
    {
      questionText: this.createSellerForm.controls.securityQuestionSeletedThree.value,
      answerText: this.createSellerForm.controls.securityQuestionThreeAnswer.value
    }
  ]

  const seller = {
    username: this.createSellerForm.controls.username.value,
    businessName: this.createSellerForm.controls.businessName.value,
    industry: this.createSellerForm.controls.industry.value,
    type: this.createSellerForm.controls.type.value,
    contactFirstName: this.createSellerForm.controls.contactLastName.value,
    contactLastName: this.createSellerForm.controls.contactLastName.value,
    phone: this.createSellerForm.controls.phone.value,
    address: this.createSellerForm.controls.address.value,
    email: this.createSellerForm.controls.email.value,
    password: this.createSellerForm.controls.password.value,
    securityQuestions: dangSecurityQuestions
  }


//post the form data to the api. 

this.marketplaceId = this.cookieService.get('userId');
console.log(this.marketplaceId);
  this.sellerService.createSeller(seller, this.marketplaceId).subscribe( res => {
    seller
  }, err => {
    console.log(err)
    alert(`There was an issue creating the role. Please ensure the role doesnt already exist. If this issue is reoccurring, please contact the system admin.`);
  })

}

}
