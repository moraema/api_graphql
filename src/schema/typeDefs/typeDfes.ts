export const typeDefs = `

  type Query {
    GetUser(page: Int, pageSize: Int, order: String): UserPagination
    GetMovies(page: Int, pageSize: Int, order: String): MoviesPagination
    GetActor(page: Int, pageSize: Int, order: String): ActorPagination
    GetComentario: [Comentarios]
    GetComentarioId(id: ID): Comentarios
    GetIdMovies(id: ID): Movies
    GetActorId(id: ID): Actores
    GetSeries: [Series]
   }

  

  type User {
    id: ID
    username: String
    password: String
  }

  type Movies {
    id: ID
    title: String
    descripcion: String
    categoria: String
    vistas: String
  }

  type Actores {
    id: ID
    nombre: String
    apellido: String
    pelicula: String
  }

  type Series {
    id: ID
    titulo: String
    temporada: String
    capitulos: String
  }
  

  type Comentarios {
    id: ID
    comentarios: String
    puntuacion: String
  }
  

  type ActorPagination {
  message: String
  data: [Actores]
  total: Int
  totalPages: Int
  currentPage: Int
  }

  type MoviesPagination {
  message: String
  data: [Movies]
  total: Int
  totalPages: Int
  currentPage: Int
  }

  type UserPagination {
  message: String
  data: [User]
  total: Int
  totalPages: Int
  currentPage: Int
  }

  input UserInput {
    id: ID
    username: String
    password: String
  }

  input MoviesInput {
    id: ID
    title: String
    descripcion: String
    categoria: String
    vistas: String
  }
 
  input ComentarioInput {
    id: ID
    comentarios: String
    puntuacion: String
  }


  input ActorInput {
    id: ID
    nombre: String
    apellido: String
    pelicula: String
  }

  input SeriesInput {
    id: ID
    titulo: String
    temporada: String
    capitulos: String
  }

  input DeleteActorInput {
    id: ID!
  }


  type DeleteActorResponse {
    id: ID
  }

  input DeleteMoviesInput {
    id: ID!
  }
  
  input DeleteSerieInput {
    id: ID
  }

  type DeleteMoviesReponse {
    id: ID
  }

  type DeleteSeriesResponde {
    id: ID
  }

  type LoginResponse {
    token: String
    message: String!
  }

  input UpdateMoviesInput {
    id: ID!
    title: String
    descripcion: String
    vistas: String
  }
  
  input UpdateSeriesInput {
    id: ID
    titulo: String
    temporada: String
    capitulos: String
  }
  

  type Mutation {
    loginUser(username: String!, password: String!): LoginResponse!
    createUser(user: UserInput): User
    createMovies(movies: MoviesInput): Movies
    createActor(actores: ActorInput): Actores
    createComentarios(comentario: ComentarioInput): Comentarios
    deleteActor(input: DeleteActorInput!): DeleteActorResponse
    updateMovies(movies: UpdateMoviesInput!): Movies
    deleteMovies(movies: DeleteMoviesInput!): DeleteMoviesReponse
    createSeries(series: SeriesInput) : Series
    updateSeries(series : UpdateSeriesInput): Series
    deleteSeries(series: DeleteSerieInput): DeleteSeriesResponde

  
    
    
  }

  type Subscription {
    moviesSave: Movies
  }
`;
