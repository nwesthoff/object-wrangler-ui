declare var _: any;

export const recursivePick = (object, paths: string[]) => {
  function doPick(object, paths: string[]) {
    if (_.isArray(object)) {
      return _.map(object, (item) => recursivePick(item, paths));
    }

    return paths.reduce((result, path) => {
      if (path.includes("[].")) {
        const [collectionPath, itemPath] = path.split(/\[]\.(.+)/);
        const collection = _.get(object, collectionPath);

        if (!_.isArray(collection)) {
          return result;
        }

        const partialResult = {};
        _.set(
          partialResult,
          collectionPath,
          _.map(collection, (item) => doPick(item, [itemPath]))
        );

        return _.merge(result, partialResult);
      }

      return _.merge(result, _.pick(object, [path]));
    }, {});
  }

  return doPick(object, paths);
};
