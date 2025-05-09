import {HttpClient, provideHttpClient} from '@angular/common/http';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {routes} from './app.routes';

const httpLoaderFactory: (http: HttpClient) =>
  TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes,
      withComponentInputBinding(),
    ),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
};
