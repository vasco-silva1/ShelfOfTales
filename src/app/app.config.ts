import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './Interceptors/token.interceptor';
import { clientGuard } from './BookComponents/guards/client.guard';
import { loaderInterceptor } from './Interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([tokenInterceptor,loaderInterceptor]))]
};
