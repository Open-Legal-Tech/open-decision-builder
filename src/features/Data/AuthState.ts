import create from "zustand";
import { devtools } from "zustand/middleware";
import { GraphQLClient } from "graphql-request";

const getRefreshToken = async (client: GraphQLClient) => {
  const { refreshToken } = await client.request<{
    refreshToken: { token: string };
  }>(`mutation REFRESH_TOKEN {
    refreshToken {
      token
    }
  }`);

  return refreshToken;
};
export type loginStatus = "loggedIn" | "loggedOut" | "undetermined";

type authState = {
  status: loginStatus;
  client: GraphQLClient;
};

type AuthState = authState & {
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>(
  devtools(
    (set, get) => ({
      status: "undetermined",
      client: new GraphQLClient(
        "https://od-backend-dev.herokuapp.com/graphql",
        { credentials: "include" }
      ),
      login: async () => {
        const authState = await getRefreshToken(get().client);

        set((state) => {
          state.client.setHeader("authorization", `JWT ${authState.token}`);
          return { status: "loggedIn" };
        });
      },
      logout: () =>
        set((state) => {
          state.client.setHeader("authorization", "");
          return { status: "loggedOut" };
        }),
    }),
    "Auth"
  )
);
