
export class Ajax{

    api_token = '117691097412738';

    constructor(){
        this.escucharClick();
    }
    // Escuchar btn
    escucharClick(){
        
        $('.btn').click( () =>  {
            const input = document.querySelector('.form-control');
            this.llamadaAjax( input.value );
        });
    }
    crearCard( heroe ){
        const card = document.createElement('div');
        const img = document.createElement('img');
        const divAppend = document.querySelector('#append');
        const cardBody = document.createElement('div');
        const { image, name, appearance, biography } = heroe;
        const { race, height, weight } = appearance;
        // Modificando card
        card.style.width = '35rem';
        cardBody.classList.add('card.body');
        cardBody.innerHTML = `<h3 class="card-title">${ name }</h3>
        <ul class="list-group">
            <li class="list-group-item">Nombre Actor: <strong>${ biography['full-name']}</strong> </li>
            <li class="list-group-item">Primera aparicion: <strong>${ biography['first-appearance']}</strong> </li>
            <li class="list-group-item">Raza: <strong>${ ( race == 'null' ) ? 'Sin info': race }</strong> </li>
            <li class="list-group-item">Altura: <strong>${ (height[1] == '0 cm') ? 'Sin info': height}</strong></li>
            <li class="list-group-item">Peso: <strong>${ ( weight[1] == '0 kg' ) ? 'Sin info': weight[1]}</li>
        </ul>`;
        // modificar img
        img.src = image.url;
        img.classList.add('card-img-top');
        
        card.append( img, cardBody );
        
        // Ultimo append
        divAppend.append(card);
    }
    
    async llamadaAjax( busqueda ){
        const spinner = document.querySelector('.spinner-border');
        spinner.classList.remove('d-none')
        await $.ajax({
            type:"GET",
            url:`https://superheroapi.com/api/${ this.api_token }/${ busqueda } `,
            dataType:"json",
            success: function(data) {
                //si todo sale bien, se agrega la funcionalidad
                this.respuesta = data;
            },
            error: function(data) {
                
            //esta función se activa si ocurre algún error
        //    durante el proceso
            },
            async: true,
           }).then( resp =>{
                this.crearCard( resp ) 
                spinner.classList.add('d-none'); 
            }  ) ;
    }
    

}