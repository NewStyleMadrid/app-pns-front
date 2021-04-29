import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';
import { catchError, concatMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { JwtModel } from '../models/jwt-model';

const AUTHORIZATION = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class ProductoInterceptorService implements HttpInterceptor {

  /*
  constructor(private tokenService: TokenService, private toastr: ToastrService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!this.tokenService.isLogged){
      return next.handle(req);
    }

    let autReq = req;
    const token = this.tokenService.getToken();

    autReq = this.addToken(req, token);
  
    
    if (token != null) {
      autReq = this.addToken(req, token);
    }
    
    return next.handle(autReq).pipe(catchError((err:HttpErrorResponse)=>{
       if(err.status===401){
        this.tokenService.logOut();
        this.toastr.error(err.error.mensaje, 'Sesión expirada!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        const jwt: JwtModel = new JwtModel(this.tokenService.getToken());
        return this.authService.refresh(jwt).pipe(concatMap((data:any)=>{
          this.tokenService.setToken(data.token);
          autReq = this.addToken(req, token);
          return next.handle(autReq);
        }));
       }else{
        this.tokenService.logOut();
        return throwError(err);
       }
    }));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProductoInterceptorService, multi: true}];
*/

constructor(
  private tokenService: TokenService,
  private authService: AuthService
) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  if (!this.tokenService.isLogged()) {
    return next.handle(req);
  }

  let intReq = req;
  const token = this.tokenService.getToken();

  intReq = this.addToken(req, token);

  return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
    if (err.status === 401) {
      const dto: JwtModel = new JwtModel(this.tokenService.getToken());
      return this.authService.refresh(dto).pipe(concatMap((data: any) => {
        console.log('refreshing....');
        this.tokenService.setToken(data.token);
        intReq = this.addToken(req, data.token);
        return next.handle(intReq);
      }));
    } else {
      this.tokenService.logOut();
      return throwError(err);
    }
  }));
}

private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
}
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: ProductoInterceptorService, multi: true }];
