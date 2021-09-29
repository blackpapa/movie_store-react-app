import React from "react";
import Customers from "../components/customers";
import { User } from "./common/navbar";
import { RouteComponentProps } from "react-router-dom";

interface gqlCustomersProps extends RouteComponentProps {
  user?: User;
}

const GqlCustomers: React.FC<gqlCustomersProps> = ({ user, ...rest }) => {
  return <Customers {...rest} user={user} />;
};

export default GqlCustomers;
