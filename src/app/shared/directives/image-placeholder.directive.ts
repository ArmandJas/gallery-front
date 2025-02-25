import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

type ImageSrc = string | null | undefined;
const placeholderClass = "imgPlaceholder"

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements OnChanges {
  @Input({required: true}) src: ImageSrc = null;

  // url link to some default image
  private defaultLocalImage = "data:image/png;base64,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";

  constructor(
    private imageRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initImage();
  }

  private initImage() {
    // show skeleton before image is loaded
    this.renderer.addClass(this.imageRef.nativeElement, placeholderClass);

    const img = new Image();

    // return on no src
    if (!this.src) {
      return;
    }

    // if possible to load image, set it to img
    img.onload = () => {
      this.setImage(this.resolveImage(this.src));
      this.renderer.removeClass(this.imageRef.nativeElement, placeholderClass);
    };
    img.onerror = () => {
      // Set a placeholder image
      this.setImage(this.defaultLocalImage);
      this.renderer.removeClass(this.imageRef.nativeElement, placeholderClass);
    };

    // triggers http request to load image
    img.src = this.resolveImage(this.src);
  }

  private setImage(src: ImageSrc) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }

  private resolveImage(src: ImageSrc): string {
    if (!src) {
      return this.defaultLocalImage;
    }

    return src;
  }
}
