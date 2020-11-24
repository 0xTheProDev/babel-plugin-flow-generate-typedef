import transformFunctionStatement from './transformFunctionStatement';

/**
 * Transforms definition of const/var/let statements to proper declaration
 * Should be called only for Named and Default Exports
 */
export default function transformVariableDefinitions(t, variableStatement) {
  if (variableStatement.kind !== 'const') {
    return t.noop();
  }

  const declaration = variableStatement.declarations[0];

  if (!declaration) {
    return variableStatement;
  }

  const declarationExpression = declaration.init;

  if (t.isFunctionExpression(declarationExpression)) {
    const functionStatement = t.functionDeclaration(
      declaration.id,
      declarationExpression.params,
      declarationExpression.body,
      declarationExpression.generator,
      declarationExpression.async
    );
    functionStatement.returnType = declaration.init.returnType;
    return transformFunctionStatement(t, functionStatement);
  }

  if (t.isArrowFunctionExpression(declarationExpression)) {
    let functionBody = declarationExpression.body;
    if (t.isExpression(functionBody)) {
      functionBody = t.blockStatement([t.expressionStatement(functionBody)]);
    }

    const functionStatement = t.functionDeclaration(
      declaration.id,
      declarationExpression.params,
      functionBody,
      declarationExpression.generator,
      declarationExpression.async
    );
    functionStatement.returnType = declaration.init.returnType;
    return transformFunctionStatement(t, functionStatement);
  }

  return t.noop();
}
