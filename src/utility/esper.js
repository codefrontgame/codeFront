/**
 * Writes out code to define a object variable
 * @param name Name of the variable
 * @param object The object value of the variable
 * @return {string} Code to the define the object variable
 */
export function objectDefinition (name, object) {
  return enumDefinition(name, object)
}

export function enumDefinition (name, object) {
  let enumCode = 'class ' + name + '_class:\n'
  enumCode += Object.keys(object).map((key) => '\t' + key + ' = \'' + object[key] + '\'').join('\n') + '\n'
  enumCode += name + ' = ' + name + '_class()\n'
  return enumCode
}

/**
 * Writes out code to define a variable
 * @param name Name of the variable to define
 * @param value Value of the variable to define
 * @return {string} Code to define a variable
 */
export function varDefinition (name, value) {
  return 'let ' + name + ' = ' + value + ';\n'
}

/**
 * Writes out code to define a function
 * @param name Function name
 * @param parameters Name of function parameters
 * @param body Function body code
 * @return {string} Code to define the function
 */
export function functionDefinition (name, parameters, body) {
  return (
    'def ' + name + '(' + parameters.join(', ') + '):\n' +
    body + '\n'
  )
}

/**
 * Writes out code to call a function with parameters
 * @param name Name of the function
 * @param parameters The input parameter VALUES to the function
 * @return {string} Code to call a function
 */
export function callDefinition (name, ...parameters) {
  return name + '(' + parameters.join(', ') + ')\n'
}

esper.plugin('lang-python')
export var engine = esper({
  language: 'python',
})
