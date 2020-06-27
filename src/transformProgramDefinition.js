/**
 * Wraps Program Body inside Module Definition
 */
export default function transformProgramDefinition(t, node, state) {
  const {
    body,
    directives,
    interpreter,
    sourceType,
  } = node;

  const {
    file: {
      opts: {
        filename: absolutePath,
        root,
      },
    },
  } = state;

  let moduleName = absolutePath.substring(root.length, absolutePath.length);

  if (moduleName.startsWith('/')) {
    moduleName = moduleName.substring(1);
  }

  if (moduleName.endsWith('.js')) {
    moduleName = moduleName.substring(0, moduleName.length - 3);
  }

  if (moduleName.endsWith('.jsx')) {
    moduleName = moduleName.substring(0, moduleName.length - 4);
  }

  const moduleKind = sourceType === 'module' ? 'ES' : 'CommonJS';
  const moduleDeclaration = t.declareModule(t.identifier(`"${moduleName}"`), t.blockStatement(body), moduleKind);
  return t.program([ moduleDeclaration ], directives, sourceType, interpreter);
}
