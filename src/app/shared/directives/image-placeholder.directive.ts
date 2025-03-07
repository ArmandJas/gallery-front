import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

type ImageSrc = string | null | undefined;
const placeholderClass = "imgPlaceholder"

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements OnChanges {
  @Input({required: true}) src: ImageSrc = null;

  private placeholderLocalImage = "placeholder.png";

  constructor(
    private imageRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnChanges(): void {
    this.initImage();
  }

  private initImage() {
    this.applyPlaceholderClass();

    const img = new Image();

    if (!this.src) {
      return;
    }

    img.src = this.src;

    img.onload = () => {
      this.setImage(this.resolveImage(this.src));
      this.removePlaceholderClass();
    };
    img.onerror = () => {
      this.setImage(this.placeholderLocalImage);
      this.removePlaceholderClass();
    };
  }

  private setImage(src: ImageSrc) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }

  private resolveImage(src: ImageSrc): string {
    if (!src) {
      return this.placeholderLocalImage;
    }

    return src;
  }

  private applyPlaceholderClass() {
    this.renderer.addClass(this.imageRef.nativeElement, placeholderClass);
  }

  private removePlaceholderClass() {
    this.renderer.removeClass(this.imageRef.nativeElement, placeholderClass);
  }
}
