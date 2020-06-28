/**
 * Transforms classProperties and classMethods from Class declaration to objectProperties in declareClass 
 */
export default function transformClassProperties(t, classProperties = []) {
  return classProperties.map(function (classProperty) {
    let isMethod = false, typeAnnotation = null;

    // Extract type annotation and check if method
    if (t.isClassProperty(classProperty)) {
      typeAnnotation = classProperty.typeAnnotation.typeAnnotation;
      isMethod = false;
    } else if (t.isClassMethod(classProperty)) {
      const returnType = classProperty.returnType ? classProperty.returnType.typeAnnotation : t.anyTypeAnnotation();
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
