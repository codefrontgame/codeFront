export function objectDefinition (name, object) {
  return 'let ' + name + ' = ' + JSON.stringify(object) + ';\n'
}

export function varDefinition (name, value) {
  return 'let ' + name + ' = ' + value + ';\n'
}

export function functionDefinition (name, parameters, body) {
  return (
    'let ' + name + ' = function (' + parameters.join(', ') + ') {\n' +
    body + '\n' +
    '};\n'
  )
}

export function callDefinition (name, ...parameters) {
  return name + '(' + parameters.join(', ') + ');\n'
}
