import transformFunctionStatement from './transformFunctionStatement';

/**
 * Transforms definition of const/var/let statements to proper declaration
 * Should be called only for Named and Default Exports
 */
export default function transformVariableDefinitions(t, variableStatement) {
  if (variableStatement.kind !== 'const') {
    return t.emptyStatement();
  }

  const declaration = variableStatement.declarations[0];

  if (!declaration) {
    return variableStatement;
  }

  if (t.isFunctionExpression(declaration.init)) {
    const functionStatement = t.functionDeclaration(declaration.id, declaration.init.params, declaration.init.body, declaration.init.generator, declaration.init.async);
    functionStatement.returnType = declaration.init.returnType;
    return transformFunctionStatement(t, functionStatement);
  }

  return t.emptyStatement();
}
