import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: UntypedFormGroup;
    loading = false;
    submitted = false;
  
    passwordIncorrect = false;
    
    emailDoesNotExist = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

   
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

       
        this.alertService.clear();
        t
        this.passwordIncorrect = false;
      
        this.emailDoesNotExist = false;


       
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    
                    if (error && typeof error === 'string') {
                        if (error === 'Email does not exist') {
                            this.emailDoesNotExist = true;
                        } else if (error === 'Password is incorrect') {
                            this.passwordIncorrect = true;
                        } else {
                           
                             this.alertService.error(error);
                        }
                    } else {
                        
                         this.alertService.error('An unexpected error occurred.'); 
                         console.error(error); 
                    }


                    this.loading = false;
                }
            });
    }
}