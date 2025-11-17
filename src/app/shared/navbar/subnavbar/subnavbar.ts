import { NgClass } from '@angular/common';
import { Component, inject, Input, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { SaveAs } from '../../../services/save-as.service';
import { ExportarPdf } from '../../../services/exportar-pdf.service';
import { LookService } from '../../../services/look.service';
import { FontService } from '../../../services/font.service';

@Component({
  selector: 'app-subnavbar',
  imports: [NgClass, RouterLink],
  templateUrl: './subnavbar.html',
})
export class Subnavbar {

  modelo:InputSignal<number> = input.required();

  servicioCompartido = inject(SaveAs);
  exportarPdf=inject(ExportarPdf);
  lookService = inject(LookService);
  route = inject(Router);

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'halloween' || savedTheme === 'cupcake') {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = 'halloween';
    }

    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

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

  descargarPdf() {
    this.exportarPdf.generarPDF();
  }

  currentTheme: 'halloween' | 'cupcake' = 'halloween'; // tema inicial

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'halloween' ? 'cupcake' : 'halloween';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem("theme",this.currentTheme);
  }

  togglePreview(){
    this.lookService.togglePreview();
  }

  fontServe = inject(FontService);

  upFont(){
    this.fontServe.upFont()
  }

  downFont(){
    this.fontServe.downFont()
  }

}
