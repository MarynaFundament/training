import { items } from './gallery-items.js';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const ul = document.querySelector(".gallery")

ul.style.listStyle = "none";
ul.style.display = "flex";
ul.style.flexWrap = "wrap";
ul.style.gap = "24px"; 
ul.style.marginLeft = "150px";


  ul.innerHTML = items.reduce((html, {preview,original,description }) => 
  html + `<li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      alt="${description}"
      style= "width:360px ", "height:"200px"
    />
  </a>
</li>`
, "")


let lightbox = new SimpleLightbox('.gallery a',
 { 
  
    captionsData: 'alt', 
    captionDelay: 1050 
});

