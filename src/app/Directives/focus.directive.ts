import { AfterViewInit, Directive, ElementRef } from '@angular/core';
// This directive automatically focuses an element when it's loaded.
@Directive({
  selector: '[appFocus]',
  standalone: true
})

export class FocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
}
}
