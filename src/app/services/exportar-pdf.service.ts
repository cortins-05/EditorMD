import { Injectable, inject } from '@angular/core';
import { SaveAs } from './save-as.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).addVirtualFileSystem(pdfFonts);

@Injectable({
  providedIn: 'root'
})
export class ExportarPdf {
  saveAs = inject(SaveAs);

  generarPDF() {
    const data = this.saveAs.contenido2();
    if (!data) {
      alert('El editor está vacío.');
      return;
    }

    const docDefinition = this.convertHTMLToDocDef(data);
    pdfMake.createPdf(docDefinition).download('documento.pdf');
  }

  convertHTMLToDocDef(html: string) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const content: any[] = [];

  const parseNode = (node: ChildNode) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;

    switch (el.tagName.toLowerCase()) {
      case 'h1':
        content.push({ text: el.innerText, fontSize: 22, bold: true, margin: [0, 10, 0, 10] });
        break;
      case 'h2':
        content.push({ text: el.innerText, fontSize: 20, bold: true, margin: [0, 8, 0, 8] });
        break;
      case 'h3':
        content.push({ text: el.innerText, fontSize: 18, bold: true, margin: [0, 6, 0, 6] });
        break;
      case 'h4':
        content.push({ text: el.innerText, fontSize: 16, bold: true, margin: [0, 4, 0, 4] });
        break;
      case 'h5':
        content.push({ text: el.innerText, fontSize: 14, bold: true, margin: [0, 2, 0, 2] });
        break;
      case 'h6':
        content.push({ text: el.innerText, fontSize: 12, bold: true, margin: [0, 2, 0, 2] });
        break;
      case 'p':
        content.push({ text: el.innerText, fontSize: 12, margin: [0, 2, 0, 2] });
        break;
      case 'blockquote':
        content.push({ text: el.innerText, italics: true, margin: [10, 2, 0, 2], color: '#555' });
        break;
      case 'pre':
  content.push({
    table: {
      widths: ['*'],
      body: [
        [
          {
            text: el.innerText,
            color: '#fff',
            fontSize: 10,
            font: 'Roboto'   // si tienes definida esta fuente
          }
        ]
      ]
    },
    layout: {
      fillColor: () => '#000', // Fondo del bloque
      paddingLeft: () => 10,
      paddingRight: () => 10,
      paddingTop: () => 8,
      paddingBottom: () => 8
    },
    margin: [0, 6, 0, 6]
  });
  break;

      case 'ul':
      case 'ol':
        const items: any[] = [];
        el.querySelectorAll('li').forEach(li => {
          items.push({ text: li.innerText, margin: [0, 2, 0, 2] });
        });
        if (el.tagName.toLowerCase() === 'ul') content.push({ ul: items, margin: [0, 4, 0, 4] });
        else content.push({ ol: items, margin: [0, 4, 0, 4] });
        break;
      case 'a':
        content.push({ text: el.innerText, link: el.getAttribute('href') || '', color: 'blue', decoration: 'underline' });
        break;
      case 'code':
        content.push({ text: el.innerText, fontSize: 10, font: 'Roboto', color: '#d6336c' });
        break;
      default:
        if (el.childNodes.length > 0) el.childNodes.forEach(child => parseNode(child));
        else if (el.innerText.trim() !== '') content.push({ text: el.innerText });
    }
  };

  tempDiv.childNodes.forEach(node => parseNode(node));

  return { content };
}

}
