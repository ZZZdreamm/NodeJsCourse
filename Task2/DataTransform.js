const DataTransform = {
    addValues: (a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
      } else if (typeof a === 'string' || typeof b === 'string') {
        return String(a) + String(b);
      } else if((typeof a === 'number' && typeof b === 'string') || (typeof a === 'string' && typeof b === 'number')) {
        return String(a) + String(b);
      } else {
        throw new Error('Addition not possible for given types');
      }
    },

    stringifyValue: (value) => {
      if (typeof value === 'object' || Array.isArray(value)) {
        return JSON.stringify(value);
      } else {
        return String(value);
      }
    },

    invertBoolean: (value) => {
      if (typeof value === 'boolean') {
        return !value;
      } else {
        throw new Error('Argument is not a boolean');
      }
    },

    convertToNumber: (value) => {
        switch (typeof value) {
            case 'number':
                return value;
            case 'boolean':
                return value ? 1 : 0;
            case 'string':
                const num = parseFloat(value);
                if(isNaN(num)){
                    throw new Error('Conversion to number not possible');
                }
                return num;
            default:
                throw new Error('Conversion to number not possible');
        }
    },

    coerceToType: (value, type) => {
        switch (type) {
            case 'number':
                return DataTransform.convertToNumber(value);
            case 'string':
                return DataTransform.stringifyValue(value);
            case 'boolean':
                return Boolean(value);
            case 'array':
                return DataTransform._convertToArray(value);
            case 'object':
                return DataTransform._convertToObject(value, type);
            default:
                if(typeof value === 'object'){
                    return DataTransform._convertToObject(value, type);
                }
                throw new Error('Invalid type specified');
        }
    },


    _convertToArray: (value) => {
      if (Array.isArray(value)) {
        return value;
      } else if (typeof value === 'string') {
        return value.split('');
      } else if(typeof value === 'object') {
        return Object.values(value);
      } else {
        return [value];
      }
    },

    _convertToObject: (value, type) => {
        if (typeof value === 'string') {
          const obj = {};
          for (let i = 0; i < value.length; i++) {
            obj[i] = value[i];
          }
          return obj;
        } else if (typeof value === 'object') {
            if(type === 'object'){
                return value;
            }else{
                return DataTransform.mapFields(value, type);
            }
        }
        else {
          return { value };
        }
      },

    _mapFields: (basicClassInstance, convertedClassType) => {
        const mappedObject = new convertedClassType();
        for (const field in mappedObject) {
          if (basicClassInstance.hasOwnProperty(field)) {
            mappedObject[field] = basicClassInstance[field];
          }else{
            mappedObject[field] = undefined;
          }
        }
        return mappedObject;
    }
  };


module.exports = DataTransform;