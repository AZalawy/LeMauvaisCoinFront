import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferFacade } from 'src/app/facades/offer.facade';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  offerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(formBuilder: FormBuilder, public offerFacade: OfferFacade) {
    this.offerForm = formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categories: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.offerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.offerForm.invalid) {
      return;
    }

    this.offerFacade.add(this.offerForm.value).subscribe(added => this.loading = added);
  }
}
