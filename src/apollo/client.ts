import api from "@/lib/axios";
import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  HttpLink,
  InMemoryCache,
  toPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const link = new HttpLink({
  uri: "http://localhost:8000/query",
  credentials: "include",
});

const errorLink = onError(({ networkError, operation, forward }) => {
  console.log('networkError', networkError?.message)

  if (networkError && networkError.message == "Failed to fetch") {
    localStorage.clear()
    return forward(operation)
  }

  if (networkError && networkError.message == "Response not successful: Received status code 401") {
    return fromPromise(
      api
        .post("/refresh", undefined, { withCredentials: true })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem(
              "refresh_token",
              (response.data as any).access_token.Token
            );
            return toPromise(forward(operation));
          }
        })
        .catch(() =>
          api
            .post("/logout", undefined, { withCredentials: true })
            .then(() => localStorage.clear())
        ) as any
    );
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  cache: new InMemoryCache(),
});
