import { PubSub } from 'graphql-subscriptions';


export const pubsub = new PubSub();
export const MOVIE_CREATED = 'MOVIE_SAVE';

export const publishMovieSave = (newMovies:any) => {


    pubsub.publish(MOVIE_CREATED, { moviesSave: newMovies})
}