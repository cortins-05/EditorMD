import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveAs {

  contenido: WritableSignal<string> = signal(""); // Signal compartida
  archivoAbierto: string | null = null;

  guardarComo() {
    const data = this.contenido();
    if (!data) {
      alert('El editor está vacío.');
      return;
    }

    const nombre = prompt('Introduce el nombre del archivo', this.archivoAbierto || 'nuevo-archivo');
    if (!nombre) return;

    const blob = new Blob([data], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = nombre.endsWith('.md') ? nombre : `${nombre}.md`;
    a.click();

    window.URL.revokeObjectURL(url);
    this.archivoAbierto = nombre;
  }

  abrirArchivo(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.contenido.set(reader.result as string);
      this.archivoAbierto = file.name;
    };
    reader.readAsText(file); // Lee como texto
  }

  guardar() {
    const data = this.contenido();
    if (!data) return;

    // Si no hay archivo abierto, hacemos un guardar como
    if (!this.archivoAbierto) {
      this.guardarComo();
      return;
    }

    // Creamos el blob y descargamos usando el nombre del archivo abierto
    const blob = new Blob([data], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = this.archivoAbierto; // usamos el nombre existente
    a.click();

    window.URL.revokeObjectURL(url);
}


}
