import './style.css';
import img from "./undraw.png";
import axios from "axios";

interface Response {
  results:MovieInfo[];
}

interface MovieInfo {
  poster_path: string;
  title: string;
}

const key = 'api_key=06431b5693dfdfb9f2a94311f7d8cbf0';
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = `${baseUrl}/discover/movie?sort_by=popularity.desc&${key}`;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = `${baseUrl}/search/movie?${key}`;

const section = document.querySelector('.section')! as HTMLDivElement;
const main = document.querySelector(".main")! as HTMLDivElement;
const form = document.querySelector(".form")! as HTMLFormElement;
const search = document.querySelector(".search")! as HTMLInputElement;
var temp = 0;

async function getMovies(url: string) {
  const response = await axios.get<Response>(url);
  const result = response.data.results;
  console.log(result);
  if (result) {
    showMovies(result);
    section.style.display = "none";
  }
  if (result.length === 0) {
    //console.log("hello")

    section.style.display = "block";
    const div2 = document.createElement('div');
    div2.classList.add("two")
    div2.innerHTML = `
         <h2 class="section-item"> Sorry, there is no result for keyword you searched.</h2>
         <img  class="section-img" src= ${img} alt="result not found">
         `
    if (temp === 0) {
      section.appendChild(div2);
      temp++;
    }
  }
}
getMovies(apiUrl);

function showMovies(data: any[]) {
  main.innerHTML = '';
  data.forEach(movie => {
    const { poster_path, title, } = movie;
    const div = document.createElement('div');
    div.classList.add("card")
    div.innerHTML = `
    <img src="${imgUrl + poster_path}"   alt="${title}">
    <h3 class="card-item"> ${title} </h3>
    <button class ="btn"> Read More </button>
    `
    main.appendChild(div)
  })
};


form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(`${searchUrl}&query=${searchTerm}`)
  } else {
    getMovies(apiUrl)
  }
})