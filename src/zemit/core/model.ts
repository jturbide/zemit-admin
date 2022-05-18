import Logger from "@/zemit/core/logger";

export interface ModelConfig {
  castOnHydrate: boolean,
  lateStateBinding: boolean,
  forceCasting: boolean,
  cache: boolean,
  events: boolean,
}

const d = new Logger('zemit/core/model');

export default class Model {

  static staticAutoIncrementId = 0;
  autoIncrementId = 0;
  loading = false;

  constructor(
    public data: {[key: string]: any} | Model | any = {},
  ) {
    this.autoIncrement();
    this.map(this.columnMap());
    this.mapRelated(this.relatedMap());
  }

  get Loading() {
    return this.loading;
  }

  set Loading(loading) {
    this.loading = loading;
  }

  autoIncrement() {
    this.autoIncrementId = Model.staticAutoIncrementId++;
  }

  sync(data: Model | object) {
    if (data instanceof Model) {
      data = data.data as {[key: string]: any};
    }
    for (const prop in data) {
      if (Object.prototype.hasOwnProperty.call(data, prop)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.data[prop] = data[prop];
      }
    }
  }

  assign(data: Model | object) {
    if (data instanceof Model) {
      data = data.data;
    }
    Object.assign(this.data, data);
  }

  merge(data: Model | object) {
    if (data instanceof Model) {
      data = data.data;
    }
    // merge.all([this.data, data])
  }

  relatedMap(): {[key: string]: Model|object} {
    return {};
  }

  mapRelated(map: {[key: string]: any}, data: Model | {[key: string]: any} = this) {

    // No mapping to process
    if (!map) {
      return data;
    }

    // Process Model data if Model is passed
    if (data instanceof Model) {
      data = data.data as {[key: string]: any};
    }

    // No mapping to process
    const length = Object.keys(map).length;
    if (!length) {
      return data;
    }

    // No mapping for empty data
    if (!Object.keys(data).length) {
      return data;
    }

    // Map related records
    for (const key in map) {
      if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== 'undefined') {
        data[key] = Array.isArray(data[key])
          ? data[key].map((related:any) => new map[key](related))
          : new map[key](data[key])
        ;
      }
    }
  }

  columnMap() {
    return {
      // id: 'index',
      // index: 'id',
    };
  }

  map(map: {[key: string]: any}, data: Model | {[key: string]: any} = this) {

    // No mapping to process
    if (!map) {
      return data;
    }

    // Process Model data if Model is passed
    if (data instanceof Model) {
      data = data.data as {[key: string]: any};
    }

    // No mapping to process
    let length = Object.keys(map).length;
    if (!length) {
      return data;
    }

    // No mapping for empty data
    if (!Object.keys(data).length) {
      return data;
    }

    // Map data object keys
    do {
      length = Object.keys(map).length;
      for (const key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key) && data[map[key]] !== 'undefined') {

          // do not overwrite existing property
          if (Object.prototype.hasOwnProperty.call(data, map[key])) {

            // do not process same key
            if (key === map[key]) {
              delete map[key];
            }

            // double map existing keys
            else {
              map['_' + key + '_'] = map[key];
              map[key] = '_' + key + '_';
            }
          }

          // remap object key
          else {
            data[map[key]] = data[key];
            delete data[key];
            delete map[key];
          }
        }
      }
    } while (Object.keys(map).length && Object.keys(map).length !== length);

    return data;
  }

  toObject() {
    const ret = {} as any;
    for (const key in this.data) {
      if (Array.isArray(this.data[key])) {
        ret[key] = [];
        for (const listKey in this.data[key]) {
          if (this.data[key][listKey] instanceof Model) {
            ret[key][listKey] = this.data[key][listKey].toObject();
          } else {
            ret[key][listKey] = this.data[key][listKey];
          }
        }

        // if is an array of models, zemit require to know if you want to keep the unpassed relationships entites or not
        if (this.data[key][0] instanceof Model) {
          if (!this.keepRelationship()) {
            ret[key].unshift(false);
          }
        }

      } else {
        if (this.data[key] instanceof Model) {
          ret[key] = this.data[key].toObject();
        } else {
          ret[key] = this.data[key];
        }
      }
    }
    d.debug(ret);
    return ret;
  }

  /**
   * @TODO handle as an associative array to support mutliple nested levels with different keepRelationship value
   */
  keepRelationship() {
    return false;
  }

  toJson() {
    return JSON.stringify(this.toObject());
  }
}
