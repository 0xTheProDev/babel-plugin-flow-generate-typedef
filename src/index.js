export default function ({types: t}) {
  return {
    visitor: {
      TypeAlias(path) {
        /**
         * If Type definition is not exported, convert it into Named Export Declaration
         */
        if (path.parent.type !== 'ExportNamedDeclaration') {
          const exportName = path.node.id.name;
          const exportDeclaration = t.exportNamedDeclaration(path.node, [], null);
          path.replaceWith(exportDeclaration);
        }
      },
    }
  };
}
