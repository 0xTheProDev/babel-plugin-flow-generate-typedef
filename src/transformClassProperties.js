/**
 * Transforms classProperties and classMethods from Class declaration to objectProperties in declareClass 
 */
export default function transformClassProperties(t, classProperties = [], classDeclarationOpts) {
  return classProperties.map(function (classProperty) {
    let isMethod = false, typeAnnotation = null;

    // Extract type annotation and check if method
    if (t.isClassProperty(classProperty)) {
      typeAnnotation = classProperty.typeAnnotation.typeAnnotation;
      isMethod = false;
    } else if (t.isClassMethod(classProperty)) {
      let returnType = classProperty.returnType ? classProperty.returnType.typeAnnotation : t.anyTypeAnnotation();

      // Return type is same as Class declaration for a constructor
      if (classProperty.kind === 'constructor') {
        const { identifier, typeParameters: { params: typeParameterParams = [] } } = classDeclarationOpts;
        const typeParameters = typeParameterParams.map(function (typeParameter) {
          return t.genericTypeAnnotation(t.identifier(typeParameter.name));
        });
        returnType = t.genericTypeAnnotation(identifier, t.typeParameterInstantiation(typeParameters));
      }

      typeAnnotation = t.functionTypeAnnotation(
        null,
        classProperty.params,
        null,
        returnType
      );
      isMethod = true;
    }

    // Create objectType property for each classProperty
    const objectTypeProperty = t.objectTypeProperty(
      classProperty.key,
      typeAnnotation,
      classProperty.variance
    );

    // Fill property values with default and method check
    objectTypeProperty.kind = 'init';
    objectTypeProperty.method = isMethod;
    objectTypeProperty.optional = false;
    objectTypeProperty.static = classProperty.static;

    return objectTypeProperty;
  });
}
