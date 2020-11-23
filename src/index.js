import transformFunctionStatement from './transformFunctionStatement';

export default function ({ types: t }) {
  return {
    visitor: {
      Program(path, state) {
        console.log(state);
      },

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
        if (t.isExportNamedDeclaration(path.parent)) {
          return;
        }

        const exportDeclaration = t.exportNamedDeclaration(path.node, [], null);
        path.replaceWith(exportDeclaration);
      },
    }
  };
}
