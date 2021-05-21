let contentObj_local = {};
let contentObj_ext = {};

function addElement(json){
	const currentDiv = document.querySelector('.content');
	contentObj_local['userid'] = document.body.id;
	contentObj_ext['userid'] = document.body.id;
	
	//Preferiti
	const favArticle = document.createElement('article');
	favArticle.className = 'hidden';
	const favText = document.createElement('h2');
	favText.textContent = 'Preferiti';
	currentDiv.appendChild(favArticle);
	favArticle.appendChild(favText);
	const newSection = document.createElement('section');
	favArticle.appendChild(newSection);
	newSection.className = 'preferiti';
	
	const contenuti = json;
	
	for (const content of contenuti){		

		const newDiv = document.createElement('div');
		newDiv.classList.add('hidden1');
		newDiv.id = contenuti.indexOf(content);
		const title = document.createElement('span');
		title.textContent = content.name;
		const favorite = document.createElement('img');
		favorite.src = 'rem.png';
		favorite.className = 'icon';
		const detButton = document.createElement('button');
		detButton.textContent = 'Mostra Dettagli';
		detButton.className = 'infop';
		const description = document.createElement('p');
		description.textContent = content.data + ' ' + content.citta + ' Prezzo: €' + content.prezzo;
		description.classList.add('hidden');
		
		const image = document.createElement('img');
		image.classList.add('imgEvent');
		image.src = '/HW1/images/' + content.image;
		
		newSection.appendChild(newDiv);
		newDiv.appendChild(title);
		title.appendChild(favorite);
		
		newDiv.appendChild(image);
		newDiv.appendChild(detButton);
		newDiv.appendChild(description);
		
		
		detButton.addEventListener('click', showDetails);
	}
	
	//Intestazione
	const newArticle= document.createElement('article');
	newArticle.id = 'elementi';
	const firstDiv = document.createElement('div');
	firstDiv.className = 'principle';
	const intestazione = document.createElement('h2');
	intestazione.textContent = 'Eventi presenti nel database';
	const textSearch = document.createElement('em');
	textSearch.textContent = 'Cerca  ';
	const search = document.createElement('input');
	currentDiv.appendChild(firstDiv);
	firstDiv.appendChild(intestazione);
	firstDiv.appendChild(textSearch);
	textSearch.appendChild(search);
	currentDiv.appendChild(newArticle);
	
	//Contenuti
	console.log(contenuti);
	
	
	for (const content of contenuti){		
		contentObj_local[contenuti.indexOf(content)] = {};
		contentObj_local[contenuti.indexOf(content)]['eventid'] = content.id; 
		

		const newDiv = document.createElement('div');
		newDiv.classList.add('show');
		newDiv.id = contenuti.indexOf(content);
		const title = document.createElement('span');
		title.textContent = content.name;
		const favorite = document.createElement('img');
		favorite.src = 'add.png';
		favorite.className = 'icon';
		const detButton = document.createElement('button');
		detButton.textContent = 'Mostra Dettagli';
		detButton.className = 'info';
		const description = document.createElement('p');
		description.textContent = content.data + ' ' + content.citta + ' Prezzo: €' + content.prezzo;
		description.classList.add('details');
		description.id = contenuti.indexOf(content);
		const image = document.createElement('img');
		image.classList.add('imgEvent');
		if(content.image.includes('http')){
			console.log('include http');
			image.src = content.image;
		} else {
			image.src = '/HW1/images/' + content.image;
		}
		
		newArticle.appendChild(newDiv);
		newDiv.appendChild(title);
		
		title.appendChild(favorite);
		newDiv.appendChild(image);
		newDiv.appendChild(detButton);
		newDiv.appendChild(description);
		
		favorite.addEventListener('click', shoppingCart);
		detButton.addEventListener('click', showDetails);
		
	}
	
		//API ticketmaster
		const articleApi= document.createElement('article');
		articleApi.className ='ticketmaster';
		articleApi.id = 'elementi';
		const divApi = document.createElement('div');
		divApi.className = 'principle';
		const titleApi = document.createElement('h2');
		titleApi.textContent = 'Cerca eventi su Ticketmaster';
		const imgApi = document.createElement('img');
		imgApi.className = 'logo';
		imgApi.src = 'logo_ticketmaster.png';
		
		const textApi = document.createElement('em');
		textApi.textContent = 'Cerca  ';
		const searchApi = document.createElement('input');
		searchApi.type = 'text';
		searchApi.id = 'ticketmaster';
		
		currentDiv.appendChild(divApi);
		divApi.appendChild(titleApi);
	
		titleApi.appendChild(imgApi);

		const suggest = document.createElement('em');
		suggest.id = 'suggerimento'
		suggest.textContent = '(Clicca il logo per mostrare suggerimenti di eventi.)'
		currentDiv.appendChild(suggest);

		divApi.appendChild(textApi);
		textApi.appendChild(searchApi);
		
		
		currentDiv.appendChild(articleApi);


		
	//Eventi
	search.addEventListener('keyup', searchContent);
	searchApi.addEventListener('keyup', searchTicketmaster);
	imgApi.addEventListener('click', searchTicketmaster);
}



fetch('fetch_event.php').then(onResponse).then(addElement);

function onResponse(response){
	console.log(response);
	return response.json();
}

function showDetails(event){ //aggiungere acquista!
	const boxDetail = event.currentTarget;
	if (boxDetail.textContent === 'Mostra Dettagli'){
		boxDetail.textContent = 'Nascondi Dettagli';
	} else {
		boxDetail.textContent = 'Mostra Dettagli';
	}
	
	if(boxDetail.className === 'info'){
		const detail = document.querySelectorAll('.details');
		for (const det of detail){
			if (det.id === boxDetail.parentNode.id){
				det.classList.remove('details');
				det.classList.add('show1');
			}
		}
	} else {
		const detail = document.querySelectorAll('.hidden p');
		for (const det of detail){
			if (det.parentNode.id === boxDetail.parentNode.id){
				det.classList.remove('hidden');
				det.classList.add('show1');
			}
		}
	}
	event.currentTarget.addEventListener('click', hideDetails);
	event.currentTarget.removeEventListener('click', showDetails);
}

function hideDetails(event){
	const boxDetail = event.currentTarget;
	if (boxDetail.textContent === 'Nascondi Dettagli'){
		boxDetail.textContent = 'Mostra Dettagli';
	} else {
		boxDetail.textContent = 'Nascondi Dettagli';
	}
	
	if(boxDetail.className === 'info'){
		const detail = document.querySelectorAll('.show1');
		for (const det of detail){
			if (det.id === boxDetail.parentNode.id){
				det.classList.remove('show1');
				det.classList.add('details');
			}
		}
	} else {
		const detail = document.querySelectorAll('.hidden p');
		for (const det of detail){
			if (det.parentNode.id === boxDetail.parentNode.id){
				det.classList.remove('show1');
				det.classList.add('hidden');
			}
		}
	}
	event.currentTarget.addEventListener('click', showDetails);
	event.currentTarget.removeEventListener('click', hideDetails);
}


function searchContent(event){
	const inputValue = document.querySelector('input').value.toUpperCase();
	const contents = document.querySelectorAll('#elementi span');
	
	for (const content of contents) {
		const temp = content.textContent.toUpperCase();
		for ( let i = 0; i<temp.length; i++) {
			if (temp.includes(inputValue)){
				content.parentNode.classList.add('show');
				content.parentNode.classList.remove('hidden');
			} else {
				content.parentNode.classList.remove('show');
				content.parentNode.classList.add('hidden');
			}
		}
	}
}

function searchTicketmaster(event){
	const type = document.querySelector('#ticketmaster').value;	
	console.log(event);
	/*if( event.type == 'click'){
		fetch('api_ticketmaster.php').then(onResponse).then(onJson);
	} else {
		fetch('api_ticketmaster.php?type=' + type).then(onResponse).then(onJson);
		
	}*/
	if(event.type == 'click'){
		console.log("inserito null o cliccato il logo");
		fetch('api_ticketmaster.php').then(onResponse).then(onJson);
	} else if(event.code == 'Enter') {
		if(type == ''){
			const eventDiv = document.querySelectorAll('.ticketmaster div');
			for(const div of eventDiv){
				div.classList.remove('show');
				div.classList.add('hidden');
			}
		} else {
			fetch('api_ticketmaster.php?type=' + type).then(onResponse).then(onJson);
		}
	}
}

function onJson(json){
	console.log(json);
	const articleApi = document.querySelector('.ticketmaster');
	for( const event of json){
		
		
		contentObj_ext[json.indexOf(event)] = {};
		contentObj_ext[json.indexOf(event)]['eventid'] = event.id; 
		contentObj_ext[json.indexOf(event)]['name'] = event.name; 
		contentObj_ext[json.indexOf(event)]['data'] = event.dates['start'].localDate;
		if(!event.priceRanges){
			contentObj_ext[json.indexOf(event)]['prezzo'] = "Non Disponibile";
		} else {
			contentObj_ext[json.indexOf(event)]['prezzo'] = event.priceRanges[0].min;
		}
		 
		contentObj_ext[json.indexOf(event)]['image'] = event.images['0'].url; 
		contentObj_ext[json.indexOf(event)]['citta'] = event._embedded.venues['0'].city.name; 
	

		const newDiv = document.createElement('div');
		newDiv.classList.add('show');
		newDiv.id = json.indexOf(event);
		const title = document.createElement('span');
		title.textContent = event.name;
		const favorite = document.createElement('img');
		favorite.src = 'add.png';
		favorite.className = 'icon';
		const detButton = document.createElement('button');
		detButton.textContent = 'Mostra Dettagli';
		detButton.className = 'info';
		const description = document.createElement('p');
		description.textContent = contentObj_ext[json.indexOf(event)]['data'] + ' ' + contentObj_ext[json.indexOf(event)]['citta'] + ' Prezzo: €' + contentObj_ext[json.indexOf(event)]['prezzo'];
		description.classList.add('details');
		description.id = json.indexOf(event);
		const image = document.createElement('img');
		image.classList.add('imgEvent');
		image.src = event.images[0].url;
		
		articleApi.appendChild(newDiv);
		newDiv.appendChild(title);
		title.appendChild(favorite);
		newDiv.appendChild(image);
		newDiv.appendChild(detButton);
		newDiv.appendChild(description);
		
		favorite.addEventListener('click', shoppingCart);
		detButton.addEventListener('click', showDetails);
	}
	
}

function shoppingCart(event){
	event.preventDefault();
	
	if(event.currentTarget.parentNode.parentNode.parentNode.className == 'ticketmaster'){
		
		const eventId = event.currentTarget.parentNode.parentNode.id
		fetch('event_dispatcher.php?id_evento=' + contentObj_ext[eventId].eventid + '&name=' + contentObj_ext[eventId].name + '&image=' + contentObj_ext[eventId].image + '&prezzo='+ contentObj_ext[eventId].prezzo + '&data='+ contentObj_ext[eventId].data + '&citta=' + contentObj_ext[eventId].citta).then(dispatchResponse, dispatchError);

	} else {
		
		const eventId = event.currentTarget.parentNode.parentNode.id
		fetch('event_dispatcher.php?id_evento=' + contentObj_local[eventId].eventid).then(dispatchResponse, dispatchError);
	}

	const boxCart = document.getElementById('links');
	
	if(!(document.getElementById('notifica'))){
		
		const notifica = document.createElement('img');
		notifica.src = 'dotred.png';
		notifica.id = 'notifica';
		boxCart.insertBefore(notifica, document.getElementById('menu'));
	}
	
	
	
}


function dispatchResponse(response) {

    if(!response.ok) {
        dispatchError();
        return null;
    }
    console.log(response);
    return response.json().then(databaseResponse); 
}

function dispatchError(error) { 
	console.log(error);
}

function databaseResponse(json) {
   
	console.log(json);
	if (!json.ok) {
        dispatchError();
        return null;
    }
    
    }