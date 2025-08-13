import { QueryClient, isServer } from "@tanstack/react-query";
import makeQueryClient from "@/Lib/Clients/makeQueryClient";

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default getQueryClient;
