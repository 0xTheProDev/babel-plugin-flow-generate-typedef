import transformFunctionStatement from './transformFunctionStatement';
import transformTypeAlias from './transformTypeAlias';

export default function ({ types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        // transform function into declare statement
        if (t.isFunctionDeclaration(path.node.declaration)) {
          const exportDeclaration = transformFunctionStatement(t, path.node.declaration);
          exportDeclaration.default = true;
          path.replaceWith(exportDeclaration);
        }
      },

      ExportNamedDeclaration(path) {
        // transform function into declare statement
        if (t.isFunctionDeclaration(path.node.declaration)) {
          const exportDeclaration = transformFunctionStatement(t, path.node.declaration);
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
