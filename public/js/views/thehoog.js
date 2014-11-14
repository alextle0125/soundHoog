$(document).ready(function(){
	if(window.location.pathname === "/thehoog"){
		var sideBarNav = document.getElementsByClassName('side-bar-options');
		for(i=0; i < sideBarNav.length; i++){
			if(sideBarNav[i].innerText === "the Hoog"){
				sideBarNav[i].style.color = "#FE7B13";
			}
		}
	}
})