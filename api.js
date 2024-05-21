
    //Eventos que ejecutan la función cambio() tanto al 
    //cargar la página (load)
    //cambios en la página (hashchange)
    window.addEventListener('load', function() {
        cambio();
    });

    window.addEventListener('hashchange', function() {
        cambio();
    });

    //Función que permite el cambio dinámico
    function cambio() {
        // Reemplaza de lo recibido por url. Saca '#' y pone un vacio '', mas la palabra Page
        var pageId = window.location.hash.replace('#', '') + 'Page';
        
        // selecciona todos los elementos <div> dentro del elemento con el ID content 
        //y los almacena en una variable llamada pages.
        var pages = document.querySelectorAll('#content div');
       
       //Variable para implementar "Página no encontrada"
        var found = false;
        console.log(pageId);
        
        //Validación para no mostrar contenido específico al cargar la página
        if (pageId === 'Page') {
            // Si solo se carga index.html, ocultamos todas las páginas
            for (var i = 0; i < pages.length; i++) {
                pages[i].classList.add('hidden');
            }
            //con el método remove, saco el atriburto hidden de un contenido elegido
            pages[0].classList.remove('hidden');
            return; // Salimos de la función sin realizar más acciones
        }

        // Si se encuentra el hash correspondiente a una página, la mostramos
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].id === pageId) {
                console.log(pages[i].id)
                pages[i].classList.remove('hidden');//mostrar
                found = true;
            } else {
                console.log(pages[i].id)
                pages[i].classList.add('hidden');//oculte
            }
        }

        // Si no se encuentra la página correspondiente, mostramos "Página no encontrada"
        if (!found) {
            var notFoundPage = document.getElementById('notFoundPage');
            if (notFoundPage) {
                notFoundPage.classList.remove('hidden');
            }
        }
    }
    document.addEventListener('DOMContentLoaded', function() {
        //buscarPokemon('pikachu');
    });

    function buscarPokemon() {
        var nombrePokemon = document.getElementById('textopokemon').value;
        fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
          .then(function(response) {
              if (!response.ok) {
                  throw new Error('La respuesta de red no fue correcta');
              }
              return response.json();
          })
          .then(function(data) {
              mostrarPokemon(data);
          })
          .catch(function(error) {
              console.error('Fetch error:', error);
          })
    }

    function buscarOtroPokemon() {
        document.getElementById('textopokemon').value = ''; 
        document.getElementById('pokemonInfo').classList.add('hidden');
        document.getElementById('BuscarPage').classList.remove('hidden'); 
    }
        
    function mostrarPokemon(pokemon) {
        var buscarPage = document.getElementById('BuscarPage');
        buscarPage.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Altura: ${pokemon.height}</p>
            <p>Peso: ${pokemon.weight}</p>
            <p>Elemento: ${pokemon.types[0].type.name}</p>
            <p>ID: ${pokemon.id}</p>
            <button onclick="location.reload()">Buscar otro Pokémon</button>
        `;
        buscarPage.classList.remove('hidden');
        document.getElementById('textopokemon').value = '';
        document.getElementById('textopokemon').focus();
    }