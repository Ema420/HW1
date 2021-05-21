let contentObj = {};

fetch("fetch_ordini.php").then(onResponse).then(addElement);
fetch("ordini_passati.php").then(onResponse).then(addElementPast);

function addElementPast(json){
	const currentDiv = document.querySelector('.passate .content');
	console.log(currentDiv);
	
	const contenuti = json;

	//Intestazione
	const newArticle= document.createElement('article');
	newArticle.id = 'elementi';
	
	
	currentDiv.appendChild(newArticle);
	console.log(contenuti);
	//Contenuti
	
	for (const content of contenuti){		
		contentObj[contenuti.indexOf(content)] = {};
		console.log(content);
		contentObj[contenuti.indexOf(content)]['data'] = content.data;
		
		/*const date_now = new Date(Date.now());
        
        
        console.log(date_now);
        if(content.data < date_now){
            fetch("dispatch_pren_passate.php").then(onResponse).then(onJson);
            console.log("passattoooo");
        }*/


		const newDiv = document.createElement('div');
		newDiv.classList.add('show');
		newDiv.id = contenuti.indexOf(content);
		const title = document.createElement('span');
		title.textContent = content.name;
		
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
	
		newDiv.appendChild(image);
		newDiv.appendChild(detButton);
		newDiv.appendChild(description);
		
		/*favorite.addEventListener('click', shoppingCart);*/
		detButton.addEventListener('click', showDetails);
		
	}
	console.log(contentObj);

    const formData = new FormData();
	
	let i=0;
	console.log(contentObj[i].id);
	while(contentObj[i]){
		formData.append(i, contentObj[i].id);
		console.log('suca');
		i++;
	}
}

function addElement(json){
    const currentDiv = document.querySelector('.content');
	
	
	const contenuti = json;

	//Intestazione
	const newArticle= document.createElement('article');
	newArticle.id = 'elementi';
	
	
	currentDiv.appendChild(newArticle);
	console.log(contenuti);
	//Contenuti
	
	for (const content of contenuti){		
		contentObj[contenuti.indexOf(content)] = {};
		console.log(content);
		contentObj[contenuti.indexOf(content)]['data'] = content.data;
		
		/*const date_now = new Date(Date.now());
        
        
        console.log(date_now);
        if(content.data < date_now){
            fetch("dispatch_pren_passate.php").then(onResponse).then(onJson);
            console.log("passattoooo");
        }*/


		const newDiv = document.createElement('div');
		newDiv.classList.add('show');
		newDiv.id = contenuti.indexOf(content);
		const title = document.createElement('span');
		title.textContent = content.name;
		
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
	
		newDiv.appendChild(image);
		newDiv.appendChild(detButton);
		newDiv.appendChild(description);
		
		/*favorite.addEventListener('click', shoppingCart);*/
		detButton.addEventListener('click', showDetails);
		
	}
	console.log(contentObj);

    const formData = new FormData();
	
	let i=0;
	console.log(contentObj[i].id);
	while(contentObj[i]){
		formData.append(i, contentObj[i].id);
		console.log('suca');
		i++;
	}
	
}

function onResponse(response){
    console.log(response);
	return response.json();
}

function onJson(){
    console.log("onjson");
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