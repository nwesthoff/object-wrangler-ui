import { pick, isArray, set, map, get, merge } from "lodash-es";

export const extendedPick = (object, paths: string[]) => {
  if (isArray(object)) {
    return map(object, (item) => extendedPick(item, paths));
  }

  return paths.reduce((result, path) => {
    if (path.includes("[].")) {
      const [collectionPath, itemPath] = path.split(/\[]\.(.+)/);
      const collection = get(object, collectionPath);

      if (!isArray(collection)) {
        return result;
      }

      const partialResult = {};
      set(
        partialResult,
        collectionPath,
        map(collection, (item) => extendedPick(item, [itemPath]))
      );

      return merge(result, partialResult);
    }

    return merge(result, pick(object, [path]));
  }, {});
};
