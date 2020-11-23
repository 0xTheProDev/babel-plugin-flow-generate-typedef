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

class ABC<T> extends React.Component.A<Test> {
  test: boolean;

  // constructor() {}

  componentDidMount(): void {
    emitter.on('event', this.listener);
  }

  getCode(): string {
    return 'a';
  }

  render() {
    return <div>Hello World</div>;
  }
}
