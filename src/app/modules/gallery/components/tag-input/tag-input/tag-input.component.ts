import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {RegexConstants} from 'src/app/core/util/regex-constants';

@Component({
  selector: 'app-tag-input',
  imports: [TranslatePipe, FormsModule],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.scss'
})
export class TagInputComponent {
  @Output() tagsChange = new EventEmitter<string[]>();
  protected readonly RegexConstants = RegexConstants;
  tagInput = "";
  tags: string[] = [];

  addTag() {
    this.tagInput = this.tagInput.trim();
    if (this.tags.includes(this.tagInput)) {
      return;
    }

    this.tags.push(this.tagInput);
    this.tagInput = "";
    this.tagsChange.emit(this.tags);
  }

  removeTag(tag: string) {
    tag = tag.trim();
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
    this.tagsChange.emit(this.tags);
  }
}
