import { FormGroup, FormControl, Validators } from '@angular/forms';

class Forms {

    private static instance: Forms;

    public static getInstance(): Forms {
        if (!Forms.instance) {
            Forms.instance = new Forms();
        }
        return Forms.instance;
    }

    FormLogin: FormGroup = new FormGroup({
        User: new FormControl('', {
            validators: [Validators.required]
        }),
        Password: new FormControl('', {
            validators: [Validators.required]
        }),
    });

    FormSignUp: FormGroup = new FormGroup({
        EmailAdress: new FormControl('', {
            validators: [Validators.required, Validators.email]
        }),
        Password: new FormControl('', {
            validators: [Validators.required, Validators.pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/))]
        }),
        FirstName: new FormControl('', {
            validators: [Validators.required]
        }),
        LastName: new FormControl('', {
            validators: [Validators.required]
        })
    });

}

export default Forms.getInstance();