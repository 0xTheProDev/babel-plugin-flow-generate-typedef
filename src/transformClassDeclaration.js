import transformExtendsNotation from './transformExtendsNotation';
import transformClassProperties from './transformClassProperties';

export default function transformClassDeclaration(t, classDefinition) {
  const className = classDefinition.id.name;
  const classIdentifier = t.identifier(className);
  const classProperties = classDefinition.body.body;

  // Create objectProperties map from classProperties and classMethods
  const objectTypeProperties = transformClassProperties(t, classProperties);
  const objectTypeAnnotation = t.objectTypeAnnotation(objectTypeProperties);

  // Create inheritance map from super class declaration
  const interfaceExtends = t.interfaceExtends(
    transformExtendsNotation(t, classDefinition.superClass),
    classDefinition.superTypeParameters
  );

  return t.declareClass(classIdentifier, classDefinition.typeParameters, [interfaceExtends], objectTypeAnnotation);
}
