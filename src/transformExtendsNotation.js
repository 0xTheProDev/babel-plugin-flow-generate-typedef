/**
 * Transforms Super Class definition to Qualified Identifier
 */
export default function transformExtendsNotation(t, memberExpression) {
  if (t.isIdentifier(memberExpression.object)) {
    return t.qualifiedTypeIdentifier(memberExpression.property, memberExpression.object);
  }

  return t.qualifiedTypeIdentifier(memberExpression.property, transformExtendsNotation(t, memberExpression.object));
}
