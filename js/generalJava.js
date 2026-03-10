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
