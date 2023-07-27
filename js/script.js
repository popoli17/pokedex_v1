const pokemonName = document.querySelector('.pokemon_name'); //buscamos dentro do html classe que precisamos
const pokemonsNumber = document.querySelector('.pokemon_number');
const pokemonsImg = document.querySelector('.pokemon_image');

const pokemonsForm = document.querySelector('.form');
const pokemonsSearch = document.querySelector('.input_search');


const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

var findPokemnom = 1;

const fetchPokemon = async (pokemon) =>{
  //fetch é assincrono, então temos que esperar ele executar a promise, para isso usamos o await
  //Porém, só podemos usar o await em funnções assincronas, para isso definimos a função fetchPokemon como async 
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //usando as crases se torna uma template string 
  
  if(APIResponse.status == 200){
    const data = await APIResponse.json();//aqui estamos pegando a resposta da API e transformando em json
    return data;
  }
  
}

const renderPokemon = async (pokemon) =>{

  pokemonName.innerHTML = "Loading..."; //aparece a mensagem de loading enquanto busca o pokemon na API

  const data = await fetchPokemon (pokemon);

  if(data) { //caso o pokemon digitado tenha registro na API ele mostra o pokemon
    pokemonsImg.style.display = 'block';
    pokemonName.innerHTML = data.name; //recebe o conteudo do elemento html que no caso é o nome do pokemon
    pokemonsNumber.innerHTML = data.id;//recebe o conteudo do elemento html que no caso é o numero do pokemon 
    pokemonsImg.src = data['sprites']['versions']['generation-v']['black-white']
    ['animated']['front_default'];
   
    pokemonsSearch.value ='';//limpa o valor do campo após pesquisa

    findPokemnom = data.id; //faz com que a busca do pokemon continue com o proximo caso seja inserido manualmente o nome de um pokemon
  } else {
    //Caso o pókemno não tenha registro:
    pokemonName.innerHTML = "Pokémon Not Found"; //A mensagem de Not found é exibina no nome do pokemno
    pokemonsNumber.innerHTML = '';// O numero do pokemno é apagado
    pokemonsImg.style.display = 'none'; //A imagem do pokemon some
  }
}

pokemonsForm.addEventListener('submit', (event) =>{
  event.preventDefault();//Para a ação de fault de pesquisar
    //console.log(pokemonsSearch.value);
    renderPokemon(pokemonsSearch.value.toLowerCase());//podemos usar o toLowerCase (deixa as letras minusculas aqui ou na função que busca o pokemon)
    
});

btnPrev.addEventListener('click', () =>{
  if(findPokemnom > 1){
  findPokemnom -= 1;
  renderPokemon(findPokemnom)
  }
});

btnNext.addEventListener('click', () =>{
  findPokemnom += 1;
  renderPokemon(findPokemnom)
 });

renderPokemon(findPokemnom)
