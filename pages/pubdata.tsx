import type { NextPage } from "next";

// import { gql, useQuery } from "@apollo/client";

// const GET_ALL_TODOS = gql`
//   query GetAllTodos {
//     allTodos {
//       edges {
//         node {
//           id
//           label
//           done
//         }
//       }
//     }
//   }
// `;

const PubData: NextPage = () => {
  // const { loading, error, data } = useQuery(GET_ALL_TODOS);
  // console.log(data);

  return (
    <>
      <h1>PubData</h1>
    </>
  );
};

export default PubData;
