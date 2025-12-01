export const getUserAvatar = (username: string): string =>
  `https://api.dicebear.com/7.x/miniavs/svg?seed=${username}`;
