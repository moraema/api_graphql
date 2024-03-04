import fetch from 'node-fetch';

export enum EventType {
    CreateSeries = 'CreateSeries',
    UpdateSeries = 'UpdateSeries',
    DeleteSeries = 'DeleteSeries'
}

export const notificarwebhook = async (webhookurl: string, evento: EventType, datos: any) => {
    let mensaje = '';

    switch (evento) {
        case EventType.CreateSeries:
            mensaje = `Nueva serie creada ${datos}`    
           break;
        
        case EventType.UpdateSeries:
            mensaje = `Serie actualizada ${datos}`
            break;
        case EventType.DeleteSeries:
            mensaje = `Serie eliminada con id:${datos}`
            break;    
        default:
            mensaje = 'Evento no reconocido';
            break;
    }

    const body = {
        content: mensaje
    };

    try {
        const resp = await fetch(webhookurl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (resp.ok) {
            console.log('Mensaje enviado exitosamente al Webhook');
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
