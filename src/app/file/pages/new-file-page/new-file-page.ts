import { Component, signal, WritableSignal } from '@angular/core';
import { WriteUtils } from '../../../utils/write.utils';
import { SaveAs } from '../../../services/save-as.service';

@Component({
  selector: 'app-new-file-page',
  templateUrl: './new-file-page.html',
})
export class NewFilePage {
  contenido: WritableSignal<string> = signal("");
  utilidades = WriteUtils;

  constructor(public editorService: SaveAs) {}

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const markdownCompleto = target.value;

    // Aplicamos todo el Markdown al bloque completo
    const html = this.utilidades.aplicarMarkdownInBlock(markdownCompleto);

    this.contenido.set(html);
    this.editorService.contenido.set(target.value);
  }
}
