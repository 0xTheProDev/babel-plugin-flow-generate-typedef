import transformFlowDefinitions from './transformFlowDefinitions';

export default function ({ types: t }) {
  return {
    name: 'babel-plugin-flow-generate-typedef',
    visitor: transformFlowDefinitions(t),
  };
}
