import {ActivatedRoute} from '@angular/router';

export class RouteUrlExtractor {
  public static getCurrentRouteUrlWithoutId(route: ActivatedRoute): string {
    let result = "";
    for (let i = 0; i < route.snapshot.url.length - 1; i++) {
      result += "/" +
        route.snapshot.url[i].path;
    }
    return result;
  }
}
