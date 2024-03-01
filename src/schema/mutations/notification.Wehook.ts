
import axios from 'axios';

export async function sendNotification(actor: any) {
   try {
       const webhookURL = process.env.URL_WEBHOOK || '';

       const message = `Se ha agregado un nuevo actor:\nNombre: ${actor.nombre}\nApellido: ${actor.apellido}\nPelícula: ${actor.pelicula}`

       await axios.post(webhookURL, {content : message});

       console.log('Los datos se enviaron al webHook');
   }     catch ( error ) {
    console.log('Hubo un error al enviar los datos al webhook');
   }
}