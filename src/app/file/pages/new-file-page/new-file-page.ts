import { Component, inject, signal, WritableSignal } from '@angular/core';
import { WriteUtils } from '../../../utils/write.utils';
import { SaveAs } from '../../../services/save-as.service';
import { LookService } from '../../../services/look.service';
import { NgClass } from '@angular/common';
import { FontService } from '../../../services/font.service';

@Component({
  selector: 'app-new-file-page',
  templateUrl: './new-file-page.html',
  imports:[NgClass]
})
export class NewFilePage {

  servicioCompartido = inject(SaveAs);

  contenido: WritableSignal<string> = signal("");
  contenido2:any = signal("");
  utilidades = WriteUtils;

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const markdownCompleto = target.value;

    const html = this.utilidades.aplicarMarkdownInBlock(markdownCompleto);

    // Actualizamos las signals del componente
    this.contenido2.set(html);
    this.contenido.set(markdownCompleto);

    // Actualizamos las signals del servicio
    this.servicioCompartido.contenido.set(markdownCompleto);
    this.servicioCompartido.contenido2.set(html);
  }

  preview = inject(LookService);

  fontSize = inject(FontService);

}
