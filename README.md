# Features

### 1. Persist type information
All Type defintion (and interface as well) should persist on output code as an exported value.
**Better**: Add Treeshaking to remove unused type/interface information.

#### Input
```typescript
export type Person {
  name: string,
  age: number,
}

type Car {
  regno: string,
  speed: number,
}
```

#### Output
```typescript
export type Person {
  name: string,
  age: number,
}

export type Car {
  regno: string,
  speed: number,
}
```

### 2. Convert Function Defintion to Declaration
Convert exported function definitions to declarations while specifying input param types and output type.

#### Input
```typescript
export function addTwoNumber(a: number, b: number): number {
  return a + b;
}
```

#### Output
```typescript
declare function addTwoNumber(a: number, b: number): number;
```

### 3. Convert Class Definition to Interface Declaration
Convert Classes to Interfaces iterating over `constructor` and/or caret expression, and, other public methods.

**Better**: Avoid publishing life-cycle methods for `React.Component` child.

#### Input
```typescript
export class DialogWidget extends React.Component<IncomingProps, InternalState> {
  componentDidMount() {
    window.title = 'Home Page';
  }

  getCurrentTime(): number {
    return Date.now();
  }

  render() {
    return (<h1>Hello World</h1>);
  }
}
```

#### Output
```typescript
export interface DialogWidget extends React.Component<IncomingProps, InternalState> {
  getCurrentTime(): number;
}
```
