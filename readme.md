# Análisis SEO

## 1.	Introducción

El presente documento hace referencia a un análisis SEO de una página web relativo a la práctica del módulo de SEO.

Para ello, se ha incluido en un servidor proporcionado por el supervisor un acceso a un subdominio de una página web donde se ha incluido la práctica de fundamentos web que implementa un currículum vitae de ejemplo.

## 2.	Análisis

El siguiente análisis SEO ha sido realizado utilizando los siguientes elementos:

- La herramienta Screaming Frog SEO Spider 9.4 (versión gratuita) es un rastreador de sitios web que permite rastrear las URL de los sitios web y buscar elementos clave en el sitio.

- Una lista de verificación para realizar una serie de comprobaciones (Screaming Frog Check List).

- La herramienta online Ubersuggest es una herramienta SEO que nos ayudará en la búsqueda de palabras claves para nuestros proyectos.

- Google Search Console es un servicio gratuito ofrecido por Google que te ayuda a supervisar y a mantener la presencia de tu sitio web en los resultados de Búsqueda de Google.

- La herramienta jpegmini que permite reducir el tamaño de una imagen hasta un 80% sin comprometer su calidad.

El enlace de acceso a la página motivo de análisis es el siguiente:
http://boba.rockstardevops.com/index.html

Incluyendo esta ruta en la herramienta Screaming Frog SEO Spider, se muestra el siguiente resultado (1 página, 9 archivos):
- 1 archivo html.
- 3 archivos css.
- 4 archivos js.
- 1 imagen jpg.

- El video no se tiene en cuenta.
- Existe una segunda imagen que no aparece en la auditoría por estar su llamada dentro de un archivo css.

A continuación, se muestran los pasos seguidos utilizando la lista de validación Screaming Frog Check List:

#### 0.	Opciones de configuración:

Configuración por defecto.

#### 1.	Scrapeo de toda la web:

Datos de la web extraídos correctamente.

#### 2.	Análisis de estados 200, 301, 404…

Todos los archivos con código de estado 200 (OK).

#### 3.	Páginas sin titles:

La página contiene un título muy mejorable poniendo palabras clave para un mejor posicionamiento.

**Solución**: título cambiado utilizando ubersuggest para obtener mejores palabras clave y lograr posicionarse mejor en las búsquedas de google.

Se ha cambiado el título “CV” por “CV Oscar Sebastian Vicente - Full Stack Developer”, siendo “Full Stack” y “Full Stack Developer” dos de las mejores frases para posicionarse (volumen de búsquedas: 1300 y 1000 respectivamente).

#### 4.	Páginas sin description:

La página no contiene descripción, por lo que, si apareciera en una SERP, nuestro Snippet carecería de descripción. Aunque la descripción no sirve para posicionar, si sirve al usuario para tener un resumen de qué hace nuestra página web para tentarle a entrar.

**Solución**: se ha puesto la etiqueta meta descripción con el siguiente texto: “Currículum vitae de Óscar Sebastián Vicente, futuro Full Stack Developer”.

#### 5.	Titles duplicados:

No existen títulos duplicados.

#### 6.	Description duplicadas:

No existen descripciones duplicadas.

#### 7.	H1 duplicados:

No existen H1 duplicados.

#### 8.	Protocolos http y https:

Todas las urls son http. Sería recomendable pasarlas a https, google en breve pondrá una marca de página no segura a todas aquellas webs que contengan al menos 1 página http no segura.

**Solución**: aunque en esta práctica no se pasa a https, sería necesario hacerlo.

#### 9.	Imágenes sin alt:

La imagen si contiene alt. La imagen es superior a 100KB, se podría reducir su tamaño sin perder calidad con jpegmini.

**Solución**: Se ha pasado de una imagen de 800x800 (340KB) a una imagen de 600x600 (72,6KB).

#### 10.	Urls sin canonical:

La página no contiene canonical. Incluir un canonical con la misma url de la página.

**Solución**: se ha incluido el canonical apuntando a la misma url.

#### 11.	Urls que tienen noindex:

No existen urls con noindex.

#### 12.	Migración web comprobamos redireccionamiento bulk de lista:

No aplica.

#### 13.	Estructura del site niveles de profundidad:

Dos niveles.

#### 14.	Errores en los enlaces internos:

No existen errores en los enlaces internos.

#### 15.	Errores en los enlaces externos:

No existen enlaces externos.

#### 16.	Tiempos de respuesta:

El 100% del contenido responde entre 0 y 1 segundo.

#### 17.	Creamos sitemap:

No existe el archivo sitemap.xml

**Solución**: creado y subido a la web. Comprobado con Search Console (no ha encontrado ningún error).

#### 18.	Contamos cuanto contenido hay:

La página originalmente contenía 531 palabras y ahora contiene 535 palabras.

#### 19.	Páginas con código de analytics:

La página no contiene código de google analytics.

#### 20.	Paginas con código de rrss:

La página no contiene código de redes sociales.

#### 21.	Paginas con schema.org:

No existen páginas con schema.org.

#### 22.	Encontrar spam words: viagra, sex, póker, drugs:

No hay palabras añadidas por hackeo, al menos de momento.

#### 23.	Oportunidades de interlinking:

No aplica.

## 3.	Conclusiones

La página web es muy pequeña para sacar conclusiones.

Se han arreglado fallos más bien de tipo SEO técnico.

No se ha realizado ningún filtro de índice ni de seguimiento, ni se ha metido archivo robots.txt para que cuando las crawlers (arañas de google) vayan a entrar a tu web para rastrearla (e indexarla), no entren en determinados sitios.

La página no contiene código de google analytics para que analice la información generada por su tráfico.
