import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appImageValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ImageValidatorDirective,
      multi: true
    },
  ],
})
export class ImageValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const regex = new RegExp("(.*?)\.(jpg|png|jpeg|bmp)$");
      const valid = regex.test(control.value);
      return valid ? null : {isValid: false};
    }
    return {isValid: false};
  }
}
