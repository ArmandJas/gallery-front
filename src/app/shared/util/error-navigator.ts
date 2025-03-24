import {Router} from '@angular/router';
import {RoutingConstants} from 'src/app/core/util/routing-constants';

export class ErrorNavigator {
  public static navigateToErrorPage(router: Router, err?: any) {
    if (!err) {
      router.navigate([RoutingConstants.ERROR_PAGE_PATH]).then();
    } else {
      router.navigate([RoutingConstants.ERROR_PAGE_PATH + '/' + err.status]).then();
    }
  }
}
