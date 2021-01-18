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

    public static generateRandomValue(minimun: number, maximum: number): number {
        return Number.parseFloat(((Math.random() * (maximum - minimun + 1)) || minimun).toFixed(2));
    }
}
