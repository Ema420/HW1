let contentObj = {};

fetch('fetch_carrello.php').then(onResponse).then(addElement);
function addElement(json){
	const currentDiv = document.querySelector('.content');
	
	
	const contenuti = json;

	//Intestazione
	const newArticle= document.createElement('article');
	newArticle.id = 'elementi';
	
	
	currentDiv.appendChild(newArticle);
	
	//Contenuti
	
	for (const content of contenuti){		
		contentObj[contenuti.indexOf(content)] = {};
		contentObj[contenuti.indexOf(content)]['id'] = content.id;
		contentObj[contenuti.indexOf(content)]['name'] = content.name; 
		contentObj[contenuti.indexOf(content)]['data'] = content.data;
		contentObj[contenuti.indexOf(content)]['image'] = content.image;
		contentObj[contenuti.indexOf(content)]['prezzo'] = content.prezzo;
		console.log(content);
		console.log(contentObj);


		const newDiv = document.createElement('div');
		newDiv.classList.add('show');
		newDiv.id = contenuti.indexOf(content);
		const title = document.createElement('span');
		title.textContent = content.name;
		const favorite = document.createElement('img');
		favorite.src = 'rem.png';
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
		
		favorite.addEventListener('click', removeFromCart);
		detButton.addEventListener('click', showDetails);
		
	}
	console.log(contentObj);
	
	//Checkout
	const checkout = document.querySelector('.checkout button');
	checkout.addEventListener('click',dispatchOrder);

	//Eventi
	/*search.addEventListener('keyup', searchContent);
	searchApi.addEventListener('keyup', searchEventbrite);
	imgApi.addEventListener('click', searchEventbrite);
	document.querySelector('form').addEventListener('submit', shoppingCart);*/
}

function onResponse(response){
	console.log(response);
	return response.json();
}

function dispatchOrder(){
	const formData = new FormData();
	
	let i=0;
	console.log(contentObj[i].id);
	while(contentObj[i]){
		formData.append(i, contentObj[i].id);
		console.log('suca');
		i++;
	}
	fetch('order_dispatch.php', {method: 'post', body: formData}).then(onResponse);
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

function removeFromCart(event){
	console.log(event.currentTarget.parentNode.parentNode.id);
	console.log(contentObj[event.currentTarget.parentNode.parentNode.id]);
	fetch("removeFromCart.php?id_evento=" + contentObj[event.currentTarget.parentNode.parentNode.id].id).then(onResponse).then(resultRemove);


}

function resultRemove(json){
	if(json.ok){
		window.location.reload();
	}
}