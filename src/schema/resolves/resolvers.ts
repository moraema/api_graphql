import { createUser } from "../mutations/create.User";
import { createMovies } from "../mutations/create.movies";
import { createActor } from "../mutations/create.actor";
import { deleteActor } from "../mutations/delete.Actor";
import { updateMovies } from "../mutations/update.movies";
import { deleteMovies } from "../mutations/delete.movies";
import { GetMovies } from "../querys/get.Movies";
import { GetIdMovies } from "../querys/getId.movies";
import { GetActorId } from "../querys/get.ActorId";
import { GetActor } from "../querys/get.Actor";
import { GetUser } from "../querys/Get.user";
import { createComentarios } from "../mutations/create.Comentario";
import { GetComentario } from "../querys/get.Cometarios";
import { GetComentarioId } from "../querys/getId.Comentario";
import { loginUser } from "../../auth/auth.user";
import { pubsub } from "../subscritions/movies.subscrition";
import { MOVIE_CREATED } from "../subscritions/movies.subscrition";
import { WebhookServer } from "../../webhokk/webhook";
const webhookServer = new WebhookServer();



export const resolvers = {
  Query: {
   GetMovies,
   GetIdMovies,
   GetActor,
   GetActorId,
   GetUser,
   GetComentario,
   GetComentarioId
   },

  Mutation: {
    loginUser,
    createUser,
    createMovies,
    createActor,
    deleteActor,
    updateMovies,
    deleteMovies,
    createComentarios
  },
  Subscription: {
    moviesSave: {
      subscribe: () => pubsub.asyncIterator([MOVIE_CREATED])
    }
  }
};