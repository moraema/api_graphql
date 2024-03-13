// Para enviar notificacion:

import fetch from 'node-fetch';

export const notificarwebhook = async (webhookurl: string, evento: string, datos: any) => {
    const body = {
        content:`${evento}: ${datos}` 
    };

    try {
        const resp = await fetch(webhookurl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (resp.ok) {
            console.log('Mensaje enviado exitosamente al Discord');
            return true;
        } else {
            console.error('Error al realizar la notificación a Discord:', resp.status, resp.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error al realizar la notificación a Discord:', error);
        return false;
    }
};