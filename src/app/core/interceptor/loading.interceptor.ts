import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{

    constructor(
        private spinner: NgxSpinnerService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('no-loading-spinner') !== 'true'){
            this.spinner.show();
        }
        
        return next.handle(req).pipe(
            finalize(() => {
                if (req.headers.get('no-loading-spinner') !== 'true'){
                    this.spinner.hide();
                }                
            })
        )
    }
}