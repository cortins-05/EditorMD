import { Component, signal, WritableSignal, effect, inject } from '@angular/core';
import { WriteUtils } from '../../../utils/write.utils';
import { SaveAs } from '../../../services/save-as.service';
import { LookService } from '../../../services/look.service';
import { NgClass } from '@angular/common';
import { FontService } from '../../../services/font.service';

@Component({
  selector: 'app-open-file-page',
  templateUrl: './open-file-page.html',
  imports:[NgClass]
})
export class OpenFilePage {

  utilidades = WriteUtils;

  contenido: WritableSignal<string> = signal("");   // markdown
  contenido2: WritableSignal<string> = signal("");  // html

  constructor(public editorService: SaveAs) {

    effect(() => {
      const markdown = this.editorService.contenido();      // markdown
      const html = this.editorService.contenido2();         // HTML ya generado
      this.contenido.set(markdown);
      this.contenido2.set(html);
      this.actualizarPreview(this.contenido());
    });
  }

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const markdown = target.value;

    const html = this.utilidades.aplicarMarkdownInBlock(markdown);

    // Actualizamos signals locales
    this.contenido.set(markdown);
    this.contenido2.set(html);

    // Guardamos en el servicio igual que NewFilePage
    this.editorService.contenido.set(markdown);
    this.editorService.contenido2.set(html);
  }

  actualizarPreview(markdownCompleto: string) {
    this.contenido.set(markdownCompleto);
    const html = this.utilidades.aplicarMarkdownInBlock(markdownCompleto);
    this.contenido2.set(html);
  }

  preview = inject(LookService);

  fontSize = inject(FontService);
}
