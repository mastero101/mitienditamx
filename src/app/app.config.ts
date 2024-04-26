import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      // Issue: When navigating for example: http://localhost:8060/inventory if page is refreshed it throws Not Found error
      // This adds the '#' to the URL and fixes issue but it would be better to use the path location strategy
      // but we are right now testing in iis and we would need to add a web.config with rewrite rule and configure deployments to
      // contain that web.config so in sake of simplicity we are using withHashLocation() so far.
      withHashLocation()
      ),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};
