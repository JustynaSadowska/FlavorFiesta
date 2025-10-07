export type AuthState = {
  user?: User | null;
};

export const isGuest = (auth: AuthState): boolean => !auth.user;

export const isAdmin = (auth: AuthState): boolean =>
  !!auth.user && auth.user.isAdmin === true;

export const isCreator = (auth: AuthState): boolean =>
  !!auth.user && auth.user.isAdmin === false;
