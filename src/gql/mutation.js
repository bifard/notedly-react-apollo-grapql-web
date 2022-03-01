import { gql } from "@apollo/client";


const EDIT_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        id
        username
      }
    }
  }
`;

const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite ($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`;

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content){
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username 
        id
      }
    }
  }
`;

const SIGNUP_USER = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password)
  }
`;
export {EDIT_NOTE, DELETE_NOTE, TOGGLE_FAVORITE, NEW_NOTE, SIGNUP_USER, SIGNIN_USER};