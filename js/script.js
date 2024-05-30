const icons = document.querySelector('.icons');
const icons_icon = icons.querySelector('span');
const mobile_menu = document.querySelector('.mobile-menu');

icons.addEventListener('click', () => {
	icons_icon.innerText = icons_icon.innerText === 'menu' 
		? 'close'
		: 'menu';

	mobile_menu.classList.toggle('is-open');
})