# EditorDeArchivosMD

**EditorDeArchivosMD** es una aplicación desarrollada en Angular cuyo objetivo es proporcionar un entorno intuitivo para crear, editar, visualizar y exportar archivos **Markdown (.md)** y **texto plano (.txt)**.  
El editor funciona completamente en el navegador y no requiere backend.

## Descripción general

El proyecto se organiza en una arquitectura modular con componentes y servicios reutilizables. Incluye:

- Editor Markdown con vista previa en tiempo real.
- Apertura de archivos locales `.md` y `.txt`.
- Guardado y guardado rápido directamente al disco.
- Exportación del documento a PDF.
- Uso de Angular Signals para el manejo del estado.
- Servicios utilitarios para lectura, escritura y conversión.
- Interfaz dividida entre área de escritura y vista previa renderizada.

## Funcionalidades principales

### ✏️ Editor en tiempo real
El usuario escribe en un `<textarea>` y el contenido se transforma automáticamente a HTML para mostrar la vista previa.  
Características soportadas:

- Encabezados Markdown
- Negritas, cursivas, listas y otros formatos
- Código inline y bloques
- Renderizado instantáneo sin recarga

### 📂 Apertura de archivos `.md` / `.txt`
El sistema permite abrir archivos locales mediante un selector nativo.  
Características:

- Uso de `FileReader` para leer texto.
- Validación cuando no se selecciona archivo.
- Carga automática del contenido en el editor.

### 💾 Guardado y guardado rápido
El editor permite dos modos de guardar:

#### Guardar como
- Permite escoger el nombre del archivo.
- Guarda como `.md` o `.txt` según preferencia.

#### Guardar
- Guarda directamente en el mismo archivo previamente abierto.
- Si el documento es nuevo, se ejecuta “Guardar como”.

### 📄 Exportación a PDF
El proyecto convierte el HTML renderizado en la vista previa a un archivo PDF.  
Esto permite:

- Escribir en Markdown.
- Renderizar como HTML.
- Exportar como PDF con formato limpio.

### 🔧 Arquitectura interna

#### Servicios principales
- **WriteUtils**: Manejo de descargas, blobs y utilidades de escritura.
- **OpenFileService**: Lógica para abrir archivos locales.
- **SaveAsService**: Manejo del guardado y guardado rápido.
- **ExportarPdf**: Convierte y exporta el contenido a PDF.

#### Componentes
- Página principal con editor + vista previa.
- Página de apertura de archivos.
- Página de exportación.

#### Utils
Helpers comunes para la conversión, lectura y escritura de archivos.

## Objetivo del proyecto

El propósito de este editor es ofrecer una herramienta accesible y potente para:

- Crear notas y documentación.
- Visualizar Markdown de forma instantánea.
- Exportar texto a formatos útiles.
- Trabajar con archivos locales sin depender de servidores.

