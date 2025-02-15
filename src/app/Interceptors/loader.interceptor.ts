import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../Services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  
  // Show the loader when the request starts
  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      // Hide the loader when the request completes
      loaderService.hide();
    })
  );
};