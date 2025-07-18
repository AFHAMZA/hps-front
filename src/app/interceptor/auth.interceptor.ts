import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(`Interceptor processing request: ${request.urlWithParams}`);
    const token = this.cookieService.get('token');
    console.log(`Token retrieved from cookies: ${token || 'No token found'}`);
    if (token) {
      console.log(`Adding Authorization header with token: Bearer ${token}`);
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedRequest);
    } else {
      console.log(
        'No token available, sending request without Authorization header'
      );
    }
    return next.handle(request);
  }
}
