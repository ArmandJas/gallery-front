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
  @Output() executeSearchEvent = new EventEmitter<PhotoPageRequest>();
  isExpanded: boolean = false;
  model = new PhotoPageRequest();

  protected executeSearch() {
    this.removeEmptyModelFields();
    this.executeSearchEvent.emit(this.model);
  }

  protected toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  protected updateTags(tags: string[]) {
    this.model.tags = tags;
  }

  private removeEmptyModelFields() {
    if (this.model.description == "") {
      this.model.description = undefined;
    }

    if (this.model.uploadDateStart == "") {
      this.model.uploadDateStart = undefined;
    }

    if (this.model.uploadDateEnd == "") {
      this.model.uploadDateEnd = undefined;
    }

    if (this.model.tags?.length == 0) {
      this.model.tags = undefined;
    }
  }
}
