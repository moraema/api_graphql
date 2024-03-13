// Crear webhooks

import { Webhooks } from "../../entities/webhook";

export const createWebhooks = async (_: void, args: any, { user }: { user: any }) => {
    if (!user) {
        throw new Error(' Usuario no autenticado.');
    }
    try {
        const { url } = args.webhooks;

        const newWebhooks = await Webhooks.create({ url }).save();
        return newWebhooks;
    } catch (error) {
        throw new Error(' Hubo un error al crear el webhook' + error)
    }
}

// Crear eventos

import { Eventos } from "../../entities/evento";

export const createEvento = async (_: void, args: any, { user }: { user: any }) => {

    if (!user) {
        throw new Error(' Usuario no autenticado.');
    }
    try {
        const { nombre, webhook } = args.eventos;

        const newEvent = await Eventos.create({ nombre, webhook }).save();

        return newEvent
    } catch (error) {
        throw new Error('Hubo un error al crear el evento' + error)
    }
}