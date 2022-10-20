import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingservice: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingservice.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingservice.hide();
      })
    );
  }
}
