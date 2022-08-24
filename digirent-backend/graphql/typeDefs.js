import { gql } from "apollo-server-express";

export default gql`
  #SECTION for global use
  type User {
    id: String
    username: String!
    name: String!
    contact: String!
    email: String
    role: String!
    updatedAt: String!
    token: String
  }

  #SECTION for query
  input LoginInput {
    username: String!
    password: String!
  }

  input FindOneMovieInput {
    id: String!
  }

  input AvailableRentalInput {
    location: String!
  }

  input cancelRentalsInput {
    id: String!
  }

  type Rental {
    id: String!
    model: String!
    type: String!
    seats: Int!
    location: String!
    status: String!
  }

  type BookRent {
    id: String!
    username: String!
    vehiclemodel: String!
    vehicleid: String!
    pickup: String!
    destination: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  input BookRentInput {
    vehicleid: String!
    pickup: String!
    destination: String!
    vehiclemodel: String!
  }

  #SECTION for Mutation
  input RegisterInput {
    username: String!
    email: String!
    name: String!
    contact: String!
    password: String!
    confirmPassword: String!
  }

  input EditUserInput {
    name: String
    email: String
    contact: String
  }

  #SECTION main
  type Query {
    login(userinput: LoginInput): User!
    getavailablerentals(userinput: AvailableRentalInput): [Rental]!
  }
  type Mutation {
    register(userinput: RegisterInput): User!
    editUser(userinput: EditUserInput): User!
    bookrent(userinput: BookRentInput): BookRent!
    cancelrent(userinput: cancelRentalsInput): Rental!
  }
`;
