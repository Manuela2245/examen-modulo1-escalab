let offset = 0; //el offset empieza desde 0
let thingSearch = '';
//Se declara funcion para display de imagenes
const displayingImg = (gifs) => `<div class="divImgGif">
<img class="imagenesGif" src=${gifs.images.original.url}> 
</div>`;
 
let searchGif = document.querySelector('#space');
const apiKey = 'hFmBhJvw20R0sF6qo21pkEd7VgEN0J1I';

let observer = new IntersectionObserver( //se declara el observer
  (entry) => {
    //observador
    entry.forEach((entry) => {
      if (entry.isIntersecting) {
        offset++; //el offset aumenta de la uno los gifstrending
        gifsTrending();
      }
    });
  },
  {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0,
  }
);
 
async function gifsTrending() {
  try {
    const urlApi = `https://api.giphy.com/v1/gifs/trending?apikey=${apiKey}&offset=${offset}`; //Api con la contraseña definida arriba y con offset para poder realizar scroll infinito
    const response = await fetch(urlApi); //esperar a llamar el api con fetch
    const data = await response.json(); //esperar a que cargue la data en jason
 
    let gif = ''; // gif expresado
 
    data && //asegura llamada datos
      data.data.forEach((gifs) => {
        gif += `<div class="divImgGif">
        <img class="imagenesGif" src=${gifs.images.original.url}> 
        </div>`;
      }); //para que sepa cuando es la ultima imagen
    document.getElementById('cuadroGifs').innerHTML = gif; //para que aparezca en el div de html
 
    const gifsView = document.querySelectorAll('.cuadroGifs .divImgGif'); //node list de los divs
    let lastImg = gifsView[gifsView.length - 1]; //Acceder a la ultima img
    observer.observe(lastImg); //se observa la ultima imagen
  } catch (error) {}
}
 
const view = async () => {
  //Buscador
  thingSearch = searchGif.value;
  const response = await fetch(
    `http://api.giphy.com/v1/gifs/search?q=${thingSearch}&api_key=${apiKey}`
  );
  const data = await response.json();
  console.log(data);
 
  let gif = ''; // gif expresado
  data && //asegura llamada datos
    data?.data.forEach((gifs) => {
      gif += `<div class="divImgGif">
        <img class="imagenesGif" src=${gifs.images.original.url}> 
        </div>`;
    }); //para que sepa cuando es la ultima imagen
  document.getElementById('cuadroGifs').innerHTML = gif;
};
 
gifsTrending();




