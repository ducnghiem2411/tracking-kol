import { gql } from "apollo-server";

export const typeDefs = gql`

scalar JSON

    type Query {
        get_boxes_info(address: String!, date: Int!, apiKey: String!): JSON
        get_fusions_info(address: String!, startTime: Float!, endTime: Float!, apiKey: String!): JSON
    }
`;
