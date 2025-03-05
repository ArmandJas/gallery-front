import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {RegexConstants} from 'src/app/core/util/regex-constants';

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
      const regex = new RegExp(RegexConstants.IMAGE_FILE_REGEX);
      const valid = regex.test(control.value);
      return valid ? null : {isValid: false};
    }

    return {isValid: false};
  }
}
