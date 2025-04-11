import {Component, model} from '@angular/core';
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
  tagListModel = model.required<string[]>();

  protected readonly RegexConstants = RegexConstants;
  tagInput = "";

  addTag() {
    this.tagInput = this.tagInput.trim();

    if (this.tagListModel().includes(this.tagInput)) {
      return;
    }

    this.tagListModel().push(this.tagInput);
    this.tagInput = "";
  }

  removeTag(tag: string) {
    tag = tag.trim();
    const index = this.tagListModel().indexOf(tag);
    this.tagListModel().splice(index, 1);
  }
}
