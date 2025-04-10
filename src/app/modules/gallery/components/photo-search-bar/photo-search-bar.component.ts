import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {PhotoPageRequest} from 'src/app/modules/gallery/models/photo-page.request';
import {TagInputComponent} from '../tag-input/tag-input/tag-input.component';

@Component({
  selector: 'app-photo-search',
  imports: [
    TranslatePipe,
    FormsModule,
    TagInputComponent
  ],
  templateUrl: './photo-search-bar.component.html',
  styleUrl: './photo-search-bar.component.scss'
})
export class PhotoSearchBarComponent {
  @Output()
  searchExecuted = new EventEmitter<PhotoPageRequest>();

  expanded: boolean = false;
  model = new PhotoPageRequest();

  protected executeSearch() {
    this.searchExecuted.emit(this.model);
  }

  protected toggleExpand() {
    this.expanded = !this.expanded;
  }
}
