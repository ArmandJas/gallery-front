import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteUrlExtractor} from 'src/app/shared/util/route-url-extractor';

@Component({
  selector: 'app-page-number-navigation',
  imports: [],
  templateUrl: './page-number-navigation.component.html',
  styleUrl: './page-number-navigation.component.scss'
})
export class PageNumberNavigationComponent {
  @Input({required: true}) pageCount: number | undefined;
  currentPageNumber: number = -1;
  currentRouteUrlWithoutId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe(() => this.refreshCurrentPageNumber());
    this.currentRouteUrlWithoutId = RouteUrlExtractor.getCurrentRouteUrlWithoutId(route);
  }

  private refreshCurrentPageNumber() {
    this.currentPageNumber = Number(this.route.snapshot.paramMap.get('pageNumber'));
  }

  protected navigateStart() {
    this.router.navigate([this.currentRouteUrlWithoutId, 1]).then();
  }

  protected navigateBack() {
    this.router.navigate([this.currentRouteUrlWithoutId, this.currentPageNumber - 1]).then();
  }

  protected navigateForward() {
    this.router.navigate([this.currentRouteUrlWithoutId, this.currentPageNumber + 1]).then();
  }

  protected navigateEnd() {
    this.router.navigate([this.currentRouteUrlWithoutId, this.pageCount]).then();
  }
}
