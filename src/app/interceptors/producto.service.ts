import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq=req;
    const tkn=this.tokenService.getToken();
    if(tkn!=null){
      intReq=req.clone({headers:req.headers.set('Authorization','Barer'+tkn)})
    }
    return next.handle(intReq);
  }
}

export const interceptorProvider=[{provide: HTTP_INTERCEPTORS, useClass: ProductoService, multi:true}];
