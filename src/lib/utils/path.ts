export function route(path: string, params?: Record<string, string>) {
  if (params) {
    let modifiedPath = path;

    Object.keys(params).forEach((key) => {
      const placeholder = `:${key}`;
      modifiedPath = modifiedPath.replace(placeholder, params[key]);
    });

    const missedParams = modifiedPath.match(/:([^/]+)/g);

    if (missedParams) {
      const missed = missedParams.map((match) => match.slice(1)).toString();
      const message = `Parameter ${missed} required`;

      throw new Error(message);
    }

    return modifiedPath;
  }

  return path;
}
