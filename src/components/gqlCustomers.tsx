import React from "react";
import Customers from "../components/customers";
import { User } from "./common/navbar";
import { RouteComponentProps } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ProgressBar from "./common/progressBar";

interface gqlCustomersProps extends RouteComponentProps {
  user?: User;
}

const getCustomersQuery = gql`
  {
    customers {
      _id
      name
      isGold
      phone
    }
  }
`;

const GqlCustomers: React.FC<gqlCustomersProps> = ({ user, ...rest }) => {
  const { data, error, loading } = useQuery(getCustomersQuery, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <ProgressBar />;
  if (error) return <h1>error</h1>;

  return <Customers {...rest} user={user} customers={data.customers} />;
};

export default GqlCustomers;
