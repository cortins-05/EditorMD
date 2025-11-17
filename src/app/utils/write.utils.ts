export class WriteUtils {

  static h1 = "text-4xl font-bold my-4";
  static h2 = "text-3xl font-bold my-3";
  static h3 = "text-2xl font-bold my-2";
  static h4 = "text-xl font-bold my-2";
  static h5 = "text-lg font-semibold my-1";
  static h6 = "text-base font-semibold my-1";

  static p = "my-1";
  static bold = "font-bold";
  static italic = "italic";
  static boldItalic = "font-bold italic";
  static strike = "line-through";

  static inlineCode = "bg-gray-800 px-1 py-0.5 rounded text-sm font-mono";
  static codeBlock = "bg-gray-900 p-3 rounded-lg text-sm font-mono my-3 whitespace-pre overflow-auto";

  static link = "text-blue-400 underline hover:text-blue-300";
  static image = "rounded max-w-full my-3";

  static ul = "list-disc list-inside my-2";
  static ol = "list-decimal list-inside my-2";
  static li = "my-1";

  static taskList = "list-none my-2";
  static taskItem = "flex items-center gap-2 my-1";
  static taskCheckbox = "w-4 h-4";

  static blockquote = "border-l-4 border-gray-500 pl-3 italic my-2";
  static hr = "border-t border-gray-700 my-4";




  static aplicarMarkdownInline(texto: string): string {

    texto = texto.replace(/`([^`]+)`/g, (_m, c) => `<code class="${this.inlineCode}">${c}</code>`);


    texto = texto.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, url) => `<img src="${url}" alt="${alt}" class="${this.image}" />`);


    texto = texto.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt, url) => `<a href="${url}" class="${this.link}" target="_blank">${txt}</a>`);


    texto = texto.replace(/(\*\*\*|___)(.*?)\1/g, (_m, _p1, p2) => `<strong class='${this.boldItalic}'><em>${p2}</em></strong>`);


    texto = texto.replace(/(\*\*|__)(.*?)\1/g, (_m, _p1, p2) => `<strong class='${this.bold}'>${p2}</strong>`);


    texto = texto.replace(/(\*|_)(.*?)\1/g, (_m, _p1, p2) => `<i class='${this.italic}'>${p2}</i>`);


    texto = texto.replace(/~~(.*?)~~/g, (_m, p1) => `<del class='${this.strike}'>${p1}</del>`);

    return texto;
  }

  


  static aplicarMarkdownInBlock(texto: string): string {

    texto = texto.replace(/```([\s\S]*?)```/g, (_m, codigo) => `<pre class="${this.codeBlock}">${codigo}</pre>`);


    const lineas = texto.split("\n");
    let html = "";
    let listaAbierta = false;
    let tipoLista = "";

    for (let linea of lineas) {
      linea = linea.trim();


      if (linea.startsWith("###### ")) html += `<h6 class="${this.h6}">${this.aplicarMarkdownInline(linea.replace(/^#{6}\s*/, ""))}</h6>`;
      else if (linea.startsWith("##### ")) html += `<h5 class="${this.h5}">${this.aplicarMarkdownInline(linea.replace(/^#{5}\s*/, ""))}</h5>`;
      else if (linea.startsWith("#### ")) html += `<h4 class="${this.h4}">${this.aplicarMarkdownInline(linea.replace(/^#{4}\s*/, ""))}</h4>`;
      else if (linea.startsWith("### ")) html += `<h3 class="${this.h3}">${this.aplicarMarkdownInline(linea.replace(/^#{3}\s*/, ""))}</h3>`;
      else if (linea.startsWith("## ")) html += `<h2 class="${this.h2}">${this.aplicarMarkdownInline(linea.replace(/^#{2}\s*/, ""))}</h2>`;
      else if (linea.startsWith("# ")) html += `<h1 class="${this.h1}">${this.aplicarMarkdownInline(linea.replace(/^#\s*/, ""))}</h1>`;


      else if (linea.startsWith(">")) html += `<blockquote class="${this.blockquote}">${this.aplicarMarkdownInline(linea.replace(/^>\s*/, ""))}</blockquote>`;


      else if (linea.startsWith("- ")) {
        if (!listaAbierta || tipoLista !== "ul") {
          if (listaAbierta) html += `</${tipoLista}>`;
          html += `<ul class="${this.ul}">`;
          listaAbierta = true;
          tipoLista = "ul";
        }
        html += `<li class="${this.li}">${this.aplicarMarkdownInline(linea.replace(/^- /, ""))}</li>`;
      }


      else if (/^\d+\.\s/.test(linea)) {
        if (!listaAbierta || tipoLista !== "ol") {
          if (listaAbierta) html += `</${tipoLista}>`;
          html += `<ol class="${this.ol}">`;
          listaAbierta = true;
          tipoLista = "ol";
        }
        html += `<li class="${this.li}">${this.aplicarMarkdownInline(linea.replace(/^\d+\.\s/, ""))}</li>`;
      }


      else if (linea === "") {
        if (listaAbierta) { html += `</${tipoLista}>`; listaAbierta = false; tipoLista = ""; }
        html += "<br />";
      }


      else {
        if (listaAbierta) { html += `</${tipoLista}>`; listaAbierta = false; tipoLista = ""; }
        html += `<p class="${this.p}">${this.aplicarMarkdownInline(linea)}</p>`;
      }
    }


    if (listaAbierta) html += `</${tipoLista}>`;

    return html;
  }
}
