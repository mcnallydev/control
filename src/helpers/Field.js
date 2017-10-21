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
   */
  static query(fieldName, fields) {
    let fieldsString = '';

    // check if fields is set and have items
    if (fields && fields.length !== 0) {

      // We go through each of the elements
      fields.map((item) => {

        // Check if item has fields
        if (item.hasOwnProperty('fields')) {

          // Concatenate the result and create his attributes if necessary
          fieldsString += `${item.field} {
            ${Field.query(item.fields)}
          }
          `;
        } else {

          // Concatenate the
          fieldsString += `${item.field}
          `;
        }
      });
    }

    return `{
      ${fieldName} {
        ${fieldsString}
      }
    }`;
  }

  static parseValue(value) {
    switch (typeof value) {
    case 'string':
      return `"${value}"`
      break;
    case 'number':
      return value
      break;
    case 'boolean':
      return value
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
  static mutate(mutateName, fieldName, inputs, fields) {
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
          fieldsString += `${item.field} {
            ${Field.query(item.fields)}
          }
          `;
        } else {

          // Concatenate the
          fieldsString += `${item.field}
          `;
        }
      });
    }

    return `mutation ${mutateName} {
      ${fieldName}(input: {
        ${inputsString}
      }) {
        ${fieldsString}
      }
    }`;
  }
}

export default Field;
