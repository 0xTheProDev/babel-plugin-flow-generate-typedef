import transformClassDeclaration from './transformClassDeclaration';
import transformFunctionStatement from './transformFunctionStatement';
import transformProgramDefinition from './transformProgramDefinition';
import transformVariableDeclaration from './transformVariableDeclaration';

export default function transformFlowDefinitions(t) {
  t.assertVersion(7);

  return {
    ClassDeclaration(path) {
      const declareClass = transformClassDeclaration(t, path.node);
      path.replaceWith(declareClass);
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
      } else if (t.isVariableDeclaration(path.node.declaration)) {
        const exportDeclaration = transformVariableDeclaration(t, path.node.declaration);
        path.replaceWith(exportDeclaration);
      }
    },

    Program(path, state) {
      const { comments } = path.parent;

      // Transform only if there's a comment with @flow
      const flowComment = comments.find(comment => comment.value.trim() === '@flow');
      if (!flowComment) {
        return;
      }

      // Ensure avoiding Stack Overflow
      if (!path.node.body || t.isDeclareModule(path.node.body[0])) {
        return;
      }

      const programDefinition = transformProgramDefinition(t, path.node, state);
      path.replaceWith(programDefinition);
    },

    TypeAlias(path) {
      // Apply only if not already exported
      if (t.isExportNamedDeclaration(path.parent)) {
        return;
      }

      const exportDeclaration = t.exportNamedDeclaration(path.node, [], null);
      path.replaceWith(exportDeclaration);
    },
  };
}
