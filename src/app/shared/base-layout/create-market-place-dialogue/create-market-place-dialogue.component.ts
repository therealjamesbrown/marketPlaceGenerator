import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MarketplaceService } from './marketplace.service';
import { UserprofileService } from 'src/app/pages/services/userprofile.service';



@Component({
  selector: 'app-create-market-place-dialogue',
  templateUrl: './create-market-place-dialogue.component.html',
  styleUrls: ['./create-market-place-dialogue.component.css']
})
export class CreateMarketPlaceDialogueComponent implements OnInit {

  securityQuestionsDataSource: any[];
  filteredSecurityQuestionsDataSource: any[];

  constructor(
    private userProfileService: UserprofileService,
    private dialog: MatDialog,
    private marketPlaceService: MarketplaceService,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) data
    ) {

      this.userProfileService.getAllSecurityQuestions().subscribe(res =>{
        console.log(res.data);
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
createMarketplaceForm: FormGroup;
enteredText:any [];

//industry. move this to values stored in a db later on....
industryDataSource: any[] = [
  {
    value: 'Automotive',
  },
  {
    value: 'Sports',
  },
  {
    value: 'Medicine',
  },
  {
    value: 'Technology',
  }
];



  ngOnInit(): void {
 
    this.createMarketplaceForm = this.fb.group({
      username: ['', Validators.required],
      businessName: ['', Validators.required],
      industry: ['', Validators.required],
      type: [{value: 'marketplace', disabled: true}, Validators.required],
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

//create the marketplace object by grabbing form values and post it to the api with the marketplace service
 createMarketplace(){

  //create the array of objects for the security questions.
  const dangSecurityQuestions = [
    {
      questionText: this.createMarketplaceForm.controls.securityQuestionSeletedOne.value,
      answerText: this.createMarketplaceForm.controls.securityQuestionOneAnswer.value
    },
    {
      questionText: this.createMarketplaceForm.controls.securityQuestionSeletedTwo.value,
      answerText: this.createMarketplaceForm.controls.securityQuestionTwoAnswer.value
    },
    {
      questionText: this.createMarketplaceForm.controls.securityQuestionSeletedThree.value,
      answerText: this.createMarketplaceForm.controls.securityQuestionThreeAnswer.value
    }
  ]

  const marketplace = {
    username: this.createMarketplaceForm.controls.username.value,
    businessName: this.createMarketplaceForm.controls.businessName.value,
    industry: this.createMarketplaceForm.controls.industry.value,
    type: this.createMarketplaceForm.controls.type.value,
    contactFirstName: this.createMarketplaceForm.controls.contactLastName.value,
    contactLastName: this.createMarketplaceForm.controls.contactLastName.value,
    phone: this.createMarketplaceForm.controls.phone.value,
    address: this.createMarketplaceForm.controls.address.value,
    email: this.createMarketplaceForm.controls.email.value,
    password: this.createMarketplaceForm.controls.password.value,
    securityQuestions: dangSecurityQuestions
  }



  this.marketPlaceService.createRole(marketplace).subscribe( res => {
    marketplace
  }, err => {
    console.log(err)
    alert(`There was an issue creating the role. Please ensure the role doesnt already exist. If this issue is reoccurring, please contact the system admin.`);
  })

}

}
