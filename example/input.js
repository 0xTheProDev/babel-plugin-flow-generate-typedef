// @flow
type Params = {
  event: string,
  data: {
    actor: string,
    message: string,
  },
};

export function addTwoNumber(a: number, b: number = 0): number {
  return a + b;
}

export const multiplyTwoNumbers = function (a: number, b: number = 1): number {
  return a * b;
}

export const abc = 5;

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
