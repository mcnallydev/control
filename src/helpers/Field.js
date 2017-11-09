/**
 * This use to convert array of objects to graphQL string.
 * @param {*} fields
 */
class Field {
  /**
   * Argument Example:
   * example
   * @param {String} fieldName
   *
   * [
   *  {
   *    field: 'id'
   *  },
   *  {
   *    field: 'name'
   *  },
   *  {
   *    field: 'company',
   *    fields: [
   *      {
   *        field: 'id'
   *      },
   *      {
   *        field: 'name'
   *      }
   *    ]
   *  }
   * ]
   * @param {*} fields
   *
   * [
   *   {
   *     field: 'id',
   *     value: 1
   *   }
   * ]
   * @param {[{}]} args
   */
  static query(fieldName, fields, args) {
    let fieldsString = '';
    let argsArray = [];

    // check if inputs is set and have items
    if (args && args.length !== 0) {
      args.map((item) => {
        // add arg to array
        argsArray.push(`${item.field}: ${Field.parseValue(item.value)}`)
      });
    }

    // check if fields is set and have items
    if (fields && fields.length !== 0) {

      // We go through each of the elements
      fields.map((item) => {

        // Check if item has fields
        if (item.hasOwnProperty('fields')) {

          // Concatenate the result and create his attributes if necessary
          fieldsString += `${item.field} {
            ${Field.query(fieldName, item.fields)}
          }
          `;
        } else {

          // Concatenate the
          fieldsString += `${item.field}
          `;
        }
      });
    }

    let argsString = (argsArray.length !== 0) ? `(${argsArray.join()})` : '';

    return `{
      ${fieldName}${argsString} {
        ${fieldsString}
      }
    }`;
  }

  static parseValue(value) {
    switch (typeof value) {
      case 'string':
        return `"${value}"`;
        break;
      case 'number':
        return value;
        break;
      case 'boolean':
        return value;
        break;

      case 'object':
        if (Array.isArray(value)) {
          let strings = value.map((item) => {
            return `"${item}"`;
          });
          return `[${strings.join(',')}]`;
        } else {
          return '';
        }
        break;
    }
  }

  /**
   * Argument Example:
   * Example
   * @param {String} fieldName
   *
   * example
   * @param {String} fieldName
   *
   * [
   *   {
   *     field: 'name',
   *     value: 'Demo'
   *   }
   * ]
   * @param {String} inputs
   *
   * [
   *  {
   *    field: 'id'
   *  },
   *  {
   *    field: 'name'
   *  },
   *  {
   *    field: 'company',
   *    fields: [
   *      {
   *        field: 'id'
   *      },
   *      {
   *        field: 'name'
   *      }
   *    ]
   *  }
   * ]
   * @param {*} fields
   */
  static mutate(mutateName, fieldName, inputs, fields, isRoot) {
    let fieldsString = '';
    let inputsString = '';

    // check if inputs is set and have items
    if (inputs && inputs.length !== 0) {
      inputs.map((item) => {
        // Concatenate the
        inputsString += `${item.field}: ${Field.parseValue(item.value)}
        `;
      });
    }

    // check if fields is set and have items
    if (fields && fields.length !== 0) {

      // We go through each of the elements
      fields.map((item) => {

        // Check if item has fields
        if (item.hasOwnProperty('fields')) {

          // Concatenate the result and create his attributes if necessary
          fieldsString += `${Field.query(item.field, item.fields, [])}
          `;
        } else {

          // Concatenate the
          fieldsString += `${item.field}
          `;
        }
      });
    }

    // Example false:
    // {
    //  id
    //  name
    // }
    //
    // Example true:
    // user {
    //  id
    //  name
    // }
    let fieldsStringFormat = (isRoot) ? `{${fieldsString}}` : fieldsString;

    return `mutation ${mutateName} {
      ${fieldName}(input: {
        ${inputsString}
      }) ${fieldsStringFormat}
    }`;
  }
}

export default Field;
