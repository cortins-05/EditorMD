import { Component, signal, WritableSignal, effect } from '@angular/core';
import { WriteUtils } from '../../../utils/write.utils';
import { SaveAs } from '../../../services/save-as.service';

@Component({
  selector: 'app-open-file-page',
  templateUrl: './open-file-page.html',
})
export class OpenFilePage {

  utilidades = WriteUtils;
  contenido: WritableSignal<string> = signal("");
  contenido2:WritableSignal<string> = signal("");

  constructor(public editorService: SaveAs) {
    // Sincronizamos automáticamente con la señal del servicio
    effect(() => {
      const texto = this.editorService.contenido();
      this.contenido2.set(texto);
      this.actualizarPreview(texto);
    });
  }

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const markdownCompleto = target.value;

    const html = this.utilidades.aplicarMarkdownInBlock(markdownCompleto);
    this.contenido.set(html);

    // Actualizamos también la señal del servicio
    this.editorService.contenido.set(target.value);
  }

  actualizarPreview(markdownCompleto: string) {
    const html = this.utilidades.aplicarMarkdownInBlock(markdownCompleto);
    this.contenido.set(html);
  }
}
