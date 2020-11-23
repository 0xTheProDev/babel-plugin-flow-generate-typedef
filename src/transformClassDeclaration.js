export default function transformClassDeclaration(t, classDefinition) {
  const className = classDefinition.id.name;
  const classIdentifier = t.identifier(className);

  const objectTypeProperties = classDefinition.body.body.map(function (classProperty) {
    if (t.isClassProperty(classProperty)) {
      const objectTypeProperty = t.objectTypeProperty(
        classProperty.key,
        classProperty.typeAnnotation.typeAnnotation,
        classProperty.variance
      );
      objectTypeProperty.kind = 'init';
      objectTypeProperty.method = false;
      objectTypeProperty.optional = false;
      objectTypeProperty.static = classProperty.static;
      return objectTypeProperty;
    }

    const returnType = classProperty.returnType ? classProperty.returnType.typeAnnotation : t.anyTypeAnnotation();
    const typeAnnotation = t.functionTypeAnnotation(
      null,
      classProperty.params,
      null,
      returnType
    );
    const objectTypeProperty = t.objectTypeProperty(
      classProperty.key,
      typeAnnotation,
      classProperty.variance
    );
    objectTypeProperty.kind = 'init';
    objectTypeProperty.optional = false;
    objectTypeProperty.static = classProperty.static;
    return objectTypeProperty;
  });

  const objectTypeAnnotation = t.objectTypeAnnotation(objectTypeProperties);
  return t.declareClass(classIdentifier, classDefinition.typeParameters, [], objectTypeAnnotation);
}
