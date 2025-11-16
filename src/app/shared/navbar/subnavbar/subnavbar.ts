import { NgClass } from '@angular/common';
import { Component, inject, Input, input, InputSignal, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SaveAs } from '../../../services/save-as.service';

@Component({
  selector: 'app-subnavbar',
  imports: [NgClass, RouterLink],
  templateUrl: './subnavbar.html',
})
export class Subnavbar {

  modelo:InputSignal<number> = input.required();

  servicioCompartido = inject(SaveAs);

  //Visibilidad con hover
  visible = signal(false);
  visibleFalse(){
    this.visible.set(false);
  }
  visibleTrue(){
    this.visible.set(true);
  }

  guardarComo() {
    this.servicioCompartido.guardarComo();
  }

  abrirArchivo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md, .txt'; // Solo Markdown o texto

    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        this.servicioCompartido.abrirArchivo(file);
      }
    };

    input.click();
  }

  guardarArchivo() {
    this.servicioCompartido.guardar();
  }

}
