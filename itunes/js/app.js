/*  

TRABAJO PRACTICO FINAL: ITUNES

En el siguiente trabajo practico utilizaremos la api de iTunes para traer información de albums de musica.

Consignas:

HEADER:
- La página debe contar con un header con una imagen que al clickearla nos recargue la página.

BODY
- Debemos contar con un input en donde el usuario pueda ingresar las palabras para buscar albums de un artista.
- Tambien habrá un boton de "Buscar" o una lupa, el cual al presionarlo realizará nuestra busqueda de disco en la api de iTunes.
- Cuando estemos buscando, deberemos mostrar un icono de "Cargando resultados..." en la pagina, el cual desaparecera cuando aparezcan los resultados.
- Por cada resultado obtenido deberemos renderizar:
	- Nombre del Artista
	- Nombre del album
	- Imagen del album
	- Pais
	- Cantidad de canciones
	- Genero
	- Precio

FOOTER
- En el footer debemos tener informacion relevante con respecto al Alumno, año, links a redes sociales
- El footer tambien debe contar con un ancla que nos lleve hacia arriba de todo de la página.

BONUS: crear radio buttons que nos permitan elegir si lo que estamos buscando es una cancion o un album.
Tener en cuenta que se renderizaran de manera diferente.

URLS de ejemplo para hacer Ajax Requests:
https://itunes.apple.com/search?term=michael+jackson&entity=album
https://itunes.apple.com/search?term=queen&entity=album

Documentacion:
https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#searchexamples
https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#searching

*/

// Function para sacar espacios y reemplazar por "+"
function spaceReplace(string){
        var wSpace = string;
        var noSpace = wSpace.replace(" ", "+");
        
        return noSpace
        
    }

// Ir hacia arriba

 $('.icono-arriba').click(function(){
     $('html, body').animate({scrollTop:0}, '300');
 })
 //Overlay esperando AJAX
    
$(document).ajaxStart(function(){
        $(".overlay").css("display", "block");
    });
$(document).ajaxComplete(function(){
        $(".overlay").css("display", "none");
    });

// Evento click en lupita
$('.fa-search').click(function(event){

    var contenedorDeAlbumes = $('.contenedor-albumes');
    contenedorDeAlbumes.empty();

    var busqueda = spaceReplace($('.input-busqueda').val());

  $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://itunes.apple.com/search?term='+busqueda+'&entity=album',
        success: function(data) {
            
            var arrayAlbums = data.results;

            console.log(arrayAlbums)

            

            // contenedor donde appendeo todo el album
            var contenedorDeAlbumes = $('.contenedor-albumes');


            arrayAlbums.map(function(element,index){
                console.log(element)
                // creando contenedor de albumes

                var contenedorAlbum = document.createElement('div');
                $(contenedorAlbum).addClass('elemento')


                var contenedorImagen = document.createElement('div');
                var contenedorNombreAlbum= document.createElement('div');
                var contenedorNombreArtista = document.createElement('div');
                var contenedorCantCanciones= document.createElement('div'); 
                var contenedorGenero = document.createElement('div');
                var contenedorPais = document.createElement('div');
                var contenedorPrecio = document.createElement('div');

                // Creando imagen
                var imagen = document.createElement('img');
                imagen.src = element.artworkUrl100;
                
                // Nombre de album
                var nombreAlbum = document.createElement('span');
                nombreAlbum.innerHTML = element.collectionName;
               
                //Nombre de artista
                var nombreArtista = document.createElement('span');
                nombreArtista.innerHTML = element.artistName;
                
                // Cantidad de canciones
                var cantCanciones = document.createElement('span');
                cantCanciones.innerHTML = element.trackCount;
                
                // genero
                var genero = document.createElement('span');
                genero.innerHTML = element.primaryGenreName;
                
                // pais
                var pais = document.createElement('span');
                pais.innerHTML = element.country;
                
                // precio
                var precio = document.createElement('span');
                precio.innerHTML= "$"+element.collectionPrice;
                

                // Apendeando los elementos
                contenedorImagen.append(imagen);
                contenedorNombreAlbum.append(nombreAlbum);
                contenedorNombreArtista.append(nombreArtista);
                contenedorCantCanciones.append(cantCanciones);
                contenedorGenero.append(genero);
                contenedorPais.append(pais);
                contenedorPrecio.append(precio);

                contenedorAlbum.append(contenedorImagen);
                contenedorAlbum.append(contenedorNombreAlbum);
                contenedorAlbum.append(contenedorNombreArtista);
                contenedorAlbum.append(contenedorCantCanciones);
                contenedorAlbum.append(contenedorGenero);
                contenedorAlbum.append(contenedorPais);
                contenedorAlbum.append(contenedorPrecio);


                contenedorDeAlbumes.append(contenedorAlbum);

                

            })


                
        

        },
        error: function(data) {
            console.log('Esta mal')
        }
    });

})




















