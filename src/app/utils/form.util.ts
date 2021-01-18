import { FormControl, FormGroup } from "@angular/forms";

export class FormUtil {

    public static validateAndTouchForm(form: FormGroup): void {
        let control: FormControl;
        Object.keys(form.controls).forEach((key: string) => {
            control = form.controls[key] as FormControl;
            if (control) {
                control.markAsDirty();
                control.markAllAsTouched();
                control.updateValueAndValidity();
            }
        });
    }
}
