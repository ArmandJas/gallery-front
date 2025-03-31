import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

type ImageSrc = string | null | undefined;

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements OnChanges {
  private readonly PLACEHOLDER_CLASS_NAME = "imgPlaceholder";
  private readonly PLACEHOLDER_IMAGE = "placeholder.png";

  @Input({required: true})
  src: ImageSrc = null;

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
      this.setImage(this.PLACEHOLDER_IMAGE);
      this.removePlaceholderClass();
    };
  }

  private setImage(src: ImageSrc) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }

  private resolveImage(src: ImageSrc): string {
    if (!src) {
      return this.PLACEHOLDER_IMAGE;
    }

    return src;
  }

  private applyPlaceholderClass() {
    this.renderer.addClass(this.imageRef.nativeElement, this.PLACEHOLDER_CLASS_NAME);
  }

  private removePlaceholderClass() {
    this.renderer.removeClass(this.imageRef.nativeElement, this.PLACEHOLDER_CLASS_NAME);
  }
}
