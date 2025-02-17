import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  OnDestroy,
  output,
  OutputEmitterRef,
  Renderer2
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

export interface Files {
  [key: number]: File;
}

@Directive({
  selector: '[appSelectFile]',
  exportAs: 'selectFile',
  standalone: true
})
export class SelectFileDirective implements AfterViewInit, OnDestroy {
  availableFormats: InputSignal<string[]> = input<string[]>([]);
  multiple: InputSignal<boolean> = input(false);

  fileSelected: OutputEmitterRef<Files> = output()

  private readonly elementRef: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);

  protected input!: HTMLInputElement;

  private readonly subscription: Subscription = new Subscription();

  @HostListener('click') onClick(): void {
    if (this.input) {
      this.input.click();
    }
  }

  ngAfterViewInit(): void {
    this.input = this.renderer.createElement('input');

    this.renderer.setAttribute(this.input, 'type', 'file');
    this.renderer.setAttribute(this.input, 'accept', this.availableFormats().join(','));
    this.renderer.setAttribute(this.input, 'multiple', `${ this.multiple() }`);

    this.renderer.setStyle(this.input, 'display', 'none');

    this.subscription.add(fromEvent(this.input, 'click')
      .subscribe((event: Event) => {
        event.stopPropagation();
        this.resetFiles();
      }));

    this.subscription.add(fromEvent(this.input, 'change')
      .subscribe((event: Event) => this.onSelectFile(event)));

    this.renderer.appendChild(this.elementRef.nativeElement, this.input);
  }

  onSelectFile(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    // @ts-ignore
    const files: FileList = (event as DragEvent).dataTransfer
      ? (event as DragEvent).dataTransfer?.files
      : (event.target as HTMLInputElement).files;

    const clonedFiles: Files = {};
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        clonedFiles[i] = files[i];
      }
    }

    this.fileSelected.emit(clonedFiles);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private resetFiles(): void {
    if (this.input && this.input.value) {
      // @ts-ignore
      this.input.value = null;
    }
  }
}

