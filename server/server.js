require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// if we use socketIO
// const { Server } = require('socket.io');
// const { createServer } = require('http');

// Development Logs for Database Transactions
const mongoose = require('mongoose');
mongoose.set('debug', true);

// Utils and Local File imports
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();

// Setup for express with SocketIO websockets
// const httpServer = createServer(app);
// const io =  new Server(httpServer);

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

// SocketIO server side event handling
// io.on("connection",(socket) =>{
//   console.log(`Client connected ID: ${socket.id}`);
// })


const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/${server.graphqlPath}`);
    });
  });
};

startApolloServer();
