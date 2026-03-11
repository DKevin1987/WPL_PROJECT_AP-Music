"use strict";
/**
 *    DROPDOWN GEDEELTE
 */
const menuBtn = document.getElementById("menu-button");
const dropdownMenu = document.getElementById("dropdownMenu");
//
//  MENU DROPDOWN BUTTON
//
menuBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dropdownMenu.classList.toggle("hidden");
});

const searchBtn = document.querySelector(".search-button");
const searchForm = document.querySelector(".header-search");
const searchFormBtn = document.querySelector(".search-button2");

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    searchForm.classList.remove("hidden");
});

searchFormBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.assign("/searchpage.html");
});
