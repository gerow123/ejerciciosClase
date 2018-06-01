/*  

TRABAJO PRACTICO FINAL: AMIIBO

En el siguiente trabajo practico utilizaremos la api de Amiibo para traer información de figuras del super Smash Bros.

Consignas:

HEADER:
- La página debe contar con un header con una imagen que al clickearla nos recargue la página.

BODY
- Debemos contar con un input en donde el usuario pueda ingresar el nombre del personaje que queremos buscar.
- Tambien habrá un boton de "Buscar" o una lupa, el cual al presionarlo realizará nuestra busqueda personaje en la api de Amiiboo.
- Cuando estemos buscando, deberemos mostrar un icono de "Cargando resultados..." en la pagina, el cual desaparecera cuando aparezcan los resultados.
- Por cada resultado obtenido deberemos renderizar:
	- Nombre del Personaje
	- Todas las imagenes disponibles de la busqueda

FOOTER
- En el footer debemos tener informacion relevante con respecto al: alumno, año, links a redes sociales
- El footer tambien debe contar con un ancla que nos lleve hacia arriba de todo de la página.

BONUS: Cuando el usuario pase la mano por arriba de cada imagen, aparecerá un tooltip con las fechas de lanzamiento en cada pais

URLS de ejemplo para hacer Ajax Requests:
http://www.amiiboapi.com/api/amiibo/
http://www.amiiboapi.com/api/amiibo/?name=mario


Documentacion:
http://www.amiiboapi.com/


*/


function spaceReplace(string){
        var wSpace = string;
        var noSpace = wSpace.replace(" ", "+");
        
        return noSpace
        
    }


    
$(document).ajaxStart(function(){
        $(".overlay").css("display", "block");
    });
$(document).ajaxComplete(function(){

        $(".overlay").css("display", "none");




    });
var contenedorGeneral = $('.contenedor');
// Evento click en lupita





$('.fa-search').click(function(event){
console.log('click')
	
	contenedorGeneral.empty();


    
	var search = $('.input-busqueda').val();
    

  $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://www.amiiboapi.com/api/amiibo/?name='+search,
        success: function(data) {

      
         var arrayAmiibo = data.amiibo; 

         arrayAmiibo.map(function(element,index){


         		var contenedorTooltip = document.createElement('div');
         		$(contenedorTooltip).addClass('tooltip');
         		contenedorTooltip.innerHTML = element.release.au
         		

         		var contenedorAmiibo = document.createElement('div');
         		$(contenedorAmiibo).addClass('amiibo');

	         	var contenedorTitulo = document.createElement('div');
	            $(contenedorTitulo).addClass('titulo');
	            contenedorTitulo.innerHTML = element.character;
	            
	            contenedorAmiibo.append(contenedorTitulo);

	            var contenedorFoto = document.createElement('img');
	            $(contenedorFoto).addClass('foto');
	            contenedorFoto.src = element.image;

	            contenedorAmiibo.append(contenedorFoto);
	            contenedorAmiibo.append(contenedorTooltip);
	            contenedorGeneral.append(contenedorAmiibo);

	            $(contenedorFoto).mouseover(function(event){


	            	$(contenedorTooltip).show();
	            	console.log(contenedorTooltip);

				})
				$(contenedorFoto).mouseleave(function() {
				    $(contenedorTooltip).hide();
				  });

         })


          
          

        },
        error: function(data) {
            console.log('Esta mal')
        }
    });

})
	

	










