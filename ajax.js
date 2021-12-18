
export class Ajax{

    api_token = '117691097412738';
    input = '';
    constructor(){
        this.escucharClick();
    }
    // Escuchar btn
    escucharClick(){
        
        $('.btn').click( () =>  {
            this.input = document.querySelector('.form-control');
            if( this.input.value > 0 ) this.llamadaAjax( this.input.value );
            else{
                document.querySelector('.alert').classList.remove('d-none');  
                this.input.value = '';
                setTimeout(() => {
                    document.querySelector('.alert').classList.add('d-none');  
                }, 2000);
            } 
        });
    }
    crearCard( heroe ){
        const card = document.createElement('div');
        const img = document.createElement('img');
        const divAppend = document.querySelector('#append');
        const cardBody = document.createElement('div');
        const { image, name, appearance, biography } = heroe;
        const { race, height, weight } = appearance;
        // Limpiar HTML
        divAppend.innerHTML = '';

        // Modificando card
        card.classList.add('d-flex')
        cardBody.classList.add('card-body','pt-0');
        cardBody.innerHTML = `
        <div>
        <h3 class="card-title border-bottom border-primary">${ name }</h3>
        <ul class="list-group">
            <li class="list-group-item">Nombre Actor: <strong>${ biography['full-name']}</strong> </li>
            <li class="list-group-item">Primera aparicion: <strong>${ biography['first-appearance']}</strong> </li>
            <li class="list-group-item">Raza: <strong>${ ( race == 'null' ) ? 'Sin info': race }</strong> </li>
            <li class="list-group-item">Altura: <strong>${ (height[1] == '0 cm') ? 'Sin info': height[1]}</strong></li>
            <li class="list-group-item">Peso: <strong>${ ( weight[1] == '0 kg' ) ? 'Sin info': weight[1]}</li>
        </ul> </div>` ;
        // modificar img
        img.src = image.url;
        img.classList.add('card-img-top');
        
        card.append( img, cardBody );
        
        // Ultimo append
        divAppend.append(card);
    }
    
    llamadaAjax( busqueda ){
        const spinner = document.querySelector('.spinner-border');
        spinner.classList.remove('d-none')
        $.ajax({
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
                this.input.value = '';
               spinner.classList.add('d-none'); 
                this.crearCard( resp );
                this.crearGrafica( resp );
            }  ) ;
    }
    crearGrafica( heroe ){
        const { powerstats } = heroe;
        if( powerstats.intelligence === 'null' &&  powerstats.strength === 'null'){
            
            return;
        }
        const chart =  new CanvasJS.Chart('chartContainer',{
            theme: 'light2',
            title:{
                text: 'Estadisticas de poder'
            },
            data: [
                {
                    type:"doughnut",
                    dataPoints: [
                        { label: "Inteligencia", y: Number(powerstats.intelligence) },
                        { label: "Fuerza", y: Number(powerstats.strength) },
                        { label: "Velocidad", y: Number(powerstats.speed) },
                        { label: "Poder", y: Number(powerstats.power)  },
                    ]
                }
            ]
        });
        chart.render();
    }
}