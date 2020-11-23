// @flow
type Params = {
  event: string,
  data: {
    actor: string,
    message: string,
  },
};

export function addTwoNumber(a: number = 0, b: number): number {
  return a + b;
}

class DialogWidget<T> extends React.Component<DialogWidgetProps, DialogWidgetState<T>> {
  test: boolean;

  constructor() {
    this.test = true;
  }

  componentDidMount(): void {
    emitter.on('event', this.listener);
  }

  getValue() {
    return this.test;
  }

  render() {
    return <div>Hello World</div>;
  }
}
