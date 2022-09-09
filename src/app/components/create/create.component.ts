import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CsvServiceService } from 'src/app/services/csv-service.service';

import { Csvdata } from 'src/app/interfaces/csvdata';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  /**
   * get fromParent data from parent component
   */
  @Input() fromParent: any;
  @Input() toUpdate!: boolean;

  form!: FormGroup;

  show = false;
  autohide = true;

  /**
   * Creates an instance of create component.
   * @param activeModal 
   * @param csvService 
   */
  constructor(
    public activeModal: NgbActiveModal,
    private csvService: CsvServiceService,
    public toastService: ToastService,
    public router: Router
  ) { }
  
  /**
   * on init
   */
  ngOnInit() {
    
     this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern("^[a-zA-Z ]+$")]),
      state: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern("^[a-zA-Z ]+$")]),
      zip: new FormControl('', [Validators.required, Validators.pattern(/^(?:\d{5,6})$/)]), 
      amount: new FormControl('', [Validators.required,Validators.minLength(1), Validators.pattern(/[+-]?([0-9]*[.])?[0-9]+/)]),
      qty: new FormControl('', [Validators.required,Validators.minLength(1), Validators.pattern(/^(?:\d{1,})$/)]),
      item: new FormControl('', [Validators.required,Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]{3,10}$/)]),
    });
  }

  /**
   * Closes modal
   * @param sendData 
   */
  closeModal(sendData: string) {
    // A reference to the currently opened (active) modal, and invoke close function
    this.activeModal.close(sendData);
    this.redirect("list");
  }


  /**
   * Submits create new post
   */
  submit(){
    // if passed all the validation in reactive form
    if(this.form.valid && !this.toUpdate){
    this.csvService.create(this.form.value).subscribe((response: Csvdata)=>{
      if(response.success){
        this.showSuccess('Post created successfully!');
      }else{
        this.showError('Failed to create post');
      }
    })
    }else{
      this.csvService.update(this.form.value).subscribe((response: any)=>{
        if(response.success){
          this.showSuccess('Post updated successfully!');
        }else{
          const errorList = Object.values(response.error);
          for (let errorItem of errorList) {
            this.showError(`${ errorItem }`);
          }
        }
      })
      
    }

    this.closeModal('Modal closed');
  }

  /**
   * Shows success
   * @param message 
   */
  showSuccess(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
    });
  }
  /**
   * Shows error
   * @param message 
   */
  showError(message: string) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
    });
  }

  /**
   * Redirects create component
   * @param route 
   */
  redirect(route: string) {
    this.router.navigate([route]);
  }
    
}
