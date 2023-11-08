import gql from "graphql-tag";

// export const GET_REPOSITORY_PAGE = gql`
//   query GetRepositoryPage($login: String!, $search: String) {
//     user(login: $login) {
//       id
//       createdAt
//       status {
//         message
//       }
//       repositories(first:10,privacy: PUBLIC) {
//         nodes{
//           name
//           createdAt
//           url
//           homepageUrl
//           languages(first:5) {
//             nodes {
//               name
//             }
//           }
//           pullRequests(first:5, states:[OPEN]) {
//             nodes {
//               author {
//               	login
//               }
//               title
//             }
//         }
//       }
//     }
//   }
// `;


export const GET_USER_REPOSITORIES = gql`
query  {
  user(login: "karademirmustafa") {
    repositories(first: 10) {
      edges {
        node {
          name
          watchers {
            totalCount
          }
          forks {
            totalCount
          }
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
}

`;

export const GET_REPOSITORY_DETAILS = gql`
query GetRepositoryDetails($repositoryName: String!, $owner: String!) {
  repository(name: $repositoryName, owner: $owner) {
    watchers {
      totalCount
    }
    forks {
      totalCount
    }
    stargazerCount
    languages(first: 5) {
      edges {
        node {
          name
        }
      }
    }
  }
}
`

export const SEARCH_USER_OR_REPOSITORY = gql`
query SearchUserOrRepository($query: String!, $first: Int!, $before: String, $after: String) {
  search(query: $query, type: REPOSITORY, first: $first, before: $before, after: $after) {
    repositoryCount
    pageInfo {
      startCursor
      hasPreviousPage
      endCursor
      hasNextPage
    }
    edges {
      node {
        ... on Repository {
          name
          owner {
            login
          }
          watchers {
            totalCount
          }
          forks {
            totalCount
          }
          stargazerCount
          primaryLanguage {
            name
          }
          refs(refPrefix: "refs/heads/", first: 100) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}

`;
