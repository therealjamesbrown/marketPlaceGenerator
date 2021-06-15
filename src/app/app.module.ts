/**
 * 
 * ================================
 * ; Title: BCRS PROJECT
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: Application for Bobs Computer Repair Shop.
 * ================================
 * 
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AdministrationComponent } from './pages/administration/administration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatTableModule } from '@angular/material/table';
import { PostDialogComponent } from '../app/pages/administration/dialogs/user-admin-post-dialog/post-dialog.component';
import { PutDialogComponent } from '../app/pages/administration/dialogs/user-admin-put-dialog/put-dialog.component';
import { PatchDialogComponent } from '../app/pages/administration/dialogs/user-admin-patch-dialog/patch-dialog.component';
import { RolemanagementComponent } from './pages/administration/rolemanagement/rolemanagement.component';
import { CatalogmanagementComponent } from './pages/administration/catalogmanagement/catalogmanagement.component';
import { PurchasegraphComponent } from './pages/administration/purchasegraph/purchasegraph.component';
import { SecurityquestionmanagementComponent } from './pages/administration/securityquestionmanagement/securityquestionmanagement.component';
import { UserManagementComponent } from '../app/pages/administration/usermanagement/usermanagement.component';
import { MatSortModule } from '@angular/material/sort';
import { DeleteRecordDialogComponentComponent } from './pages/administration/rolemanagement/delete-record-dialog-component/delete-record-dialog-component.component';
import { CreateRoleDialogComponent } from './pages/administration/dialogs/create-role-dialog/create-role-dialog.component';
import { CreateSecurityquestionDialogComponent } from './pages/administration/dialogs/create-securityquestion-dialog/create-securityquestion-dialog.component';
import { DeleteSecurityquestionDialogComponent } from './pages/administration/dialogs/delete-securityquestion-dialog/delete-securityquestion-dialog.component';
import { UpdateRoleDialogComponent } from './pages/administration/dialogs/update-role-dialog/update-role-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MoreVertDialogComponent } from './pages/administration/dialogs/user-options-dialog/dialogs/more-vert-dialog/more-vert-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateCatalogItemComponent } from './pages/administration/dialogs/create-catalog-item/create-catalog-item.component';
import { UpdateCatalogItemComponent } from './pages/administration/dialogs/update-catalog-item/update-catalog-item.component';
import { DeleteCatalogItemComponent } from './pages/administration/dialogs/delete-catalog-item/delete-catalog-item.component';
import { UpdateSecurityquestionDialogComponent } from './pages/administration/dialogs/update-securityquestion-dialog/update-securityquestion-dialog.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ErrorInterceptor } from './shared/error.interceptor';
import { ErrorComponent } from './pages/error/error.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateorderComponent } from './pages/home/createorder/createorder.component';
import { OrderhistoryComponent } from './pages/home/orderhistory/orderhistory.component';
import { DatePipe } from '@angular/common';
import { VerifyUsernameComponent } from './pages/reset-password/verify-username/verify-username.component';
import { VerifySecurityQuestionsComponent } from './pages/reset-password/verify-security-questions/verify-security-questions.component'; 
import { ResetPasswordComponent } from './pages/reset-password/reset-password/reset-password.component';
import { ViewtransactiondialogComponent } from './pages/home/dialogs/orderhistory/viewtransactiondialog/viewtransactiondialog.component';
import { ViewAllTransactionsDialogComponent } from './pages/home/dialogs/orderhistory/view-all-transactions-dialog/view-all-transactions-dialog.component';
import { ResetPasswordProcessComponent } from './pages/reset-password/reset-password-process/reset-password-process.component';
import { UserdetailsComponent } from './pages/profile/userdetails/userdetails.component';
import { UpdateAccountComponent } from './pages/profile/update-account/update-account.component';
import { ChangePasswordComponent } from './pages/profile/dialogs/change-password/change-password.component';
import { SuccessComponent } from './pages/profile/dialogs/success/success.component';
import { ChangeSecurityQuestionsComponent } from './pages/profile/dialogs/change-security-questions/change-security-questions.component';
import { UpdateContactDialogComponent } from './pages/profile/dialogs/update-contact-dialog/update-contact-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InvoiceReviewDialogComponent } from './pages/home/dialogs/invoice-review-dialog/invoice-review-dialog.component';
import { PurchaseHistoryGraphComponent } from './pages/home/purchase-history-graph/purchase-history-graph.component';
import { ChartModule } from 'primeng/chart';
import { CreateMarketPlaceComponent } from './pages/home/create-market-place/create-market-place.component';
import { CreationHistoryComponent } from './pages/home/creation-history/creation-history.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateMarketPlaceDialogueComponent } from './shared/base-layout/create-market-place-dialogue/create-market-place-dialogue.component';
import { PaymentsComponent } from './pages/administration/payments/payments.component';
import { CreateSellerComponent } from './shared/base-layout/create-seller/create-seller.component';
import { SellerListComponent } from './pages/home/seller-list/seller-list.component';
import { CreateDialogueComponent } from './shared/base-layout/create-dialogue/create-dialogue.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    SigninComponent,
    AdministrationComponent,
    ProfileComponent,
    PostDialogComponent,
    PutDialogComponent,
    PatchDialogComponent,
    RolemanagementComponent,
    CatalogmanagementComponent,
    PurchasegraphComponent,
    SecurityquestionmanagementComponent,
    UserManagementComponent,
    DeleteRecordDialogComponentComponent,
    CreateRoleDialogComponent,
    CreateSecurityquestionDialogComponent,
    DeleteSecurityquestionDialogComponent,
    UpdateRoleDialogComponent,
    MoreVertDialogComponent,
    CreateCatalogItemComponent,
    UpdateCatalogItemComponent,
    DeleteCatalogItemComponent,
    UpdateSecurityquestionDialogComponent,
    CreateAccountComponent,
    ErrorComponent,
    NotfoundComponent,
    CreateorderComponent,
    OrderhistoryComponent,
    VerifyUsernameComponent,
    VerifySecurityQuestionsComponent,
    ResetPasswordComponent,
    ViewtransactiondialogComponent,
    ViewAllTransactionsDialogComponent,
    ResetPasswordProcessComponent,
    UserdetailsComponent,
    UpdateAccountComponent,
    ChangePasswordComponent,
    SuccessComponent,
    ChangeSecurityQuestionsComponent,
    UpdateContactDialogComponent,
    InvoiceReviewDialogComponent,
    PurchaseHistoryGraphComponent,
    CreateMarketPlaceComponent,
    CreationHistoryComponent,
    CreateMarketPlaceDialogueComponent,
    PaymentsComponent,
    CreateSellerComponent,
    SellerListComponent,
    CreateDialogueComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    ScrollingModule,
    MatCheckboxModule,
    ChartModule,
    MatSidenavModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
  },
  CookieService,
  DatePipe  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
