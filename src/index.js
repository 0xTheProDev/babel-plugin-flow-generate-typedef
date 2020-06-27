import transformFunctionStatement from './transformFunctionStatement';
import transformTypeAlias from './transformTypeAlias';

export default function ({ types: t }) {
  return {
    visitor: {
      ExportNamedDeclaration(path) {
        if (t.isFunctionDeclaration(path.node.declaration)) {
          const functionDeclaration = transformFunctionStatement(t, path.node.declaration);
          const exportDeclaration = t.declareExportDeclaration(functionDeclaration, null, null);
          path.replaceWith(exportDeclaration);
        }
      },

      TypeAlias(path) {
        // Apply only if not already exported
        if (path.parent.type === 'ExportNamedDeclaration') {
          return;
        }

        const exportDeclaration = t.exportNamedDeclaration(path.node, [], null);
        path.replaceWith(exportDeclaration);
      },
    }
  };
}
