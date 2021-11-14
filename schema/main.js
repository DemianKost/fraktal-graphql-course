const graphql = require('graphql');
const _ = require('lodash');
const posts = require('./data.json');
const authors = require('./authors.json');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

const PostAuthorType = new GraphQLObjectType({
  name: 'PostAuthor',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    posts: {
      type: new GraphQLList( PostType ),
      resolve( parent, args ) {
        return _.filter(posts.postses, { authorId: parent.id });
      }
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: PostAuthorType,
      resolve( parent, args ) {
        return _.find( authors.authors, { id: parent.authorId } );
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve( parent, args ) {
        return _.find(posts.postses, {id: args.id});
      }
    },
    posts: {
      type: new GraphQLList( PostType ),
      resolve( parent, args ) {
        return posts.postses;
      }
    },
    authors: {
      type: new GraphQLList( PostAuthorType ),
      resolve( parent, args ) {
        return authors.authors;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        authorId: { type: GraphQLString }
      },
      resolve( parent, args ) {
        let post = {
          title: args.title,
          description: args.description,
          authorId: args.authorId
        };

        return post;
      }
    },
    addAuthor: {
      type: PostAuthorType,
      args: {
        name: { type: GraphQLString },
      },
      resolve( parent, args ) {
        let author = {
          name: args.name
        };

        return author;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
