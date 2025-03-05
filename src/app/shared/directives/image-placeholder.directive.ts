import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

type ImageSrc = string | null | undefined;
const placeholderClass = "imgPlaceholder"

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements OnChanges {
  @Input({required: true}) src: ImageSrc = null;

  // url link to some default image
  private defaultLocalImage = "placeholder.png";

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
