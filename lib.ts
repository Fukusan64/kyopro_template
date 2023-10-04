import { createInterface } from 'node:readline';
import { readFileSync } from 'node:fs';

export type Pair<T, U> = [T, U];
export const Pair = <T, U>(v1: T, v2: U): Pair<T, U> => [v1, v2];

export type int = bigint;
export const int = BigInt;

export const readAll = () => readFileSync('/dev/stdin').toString();
export const onReadLine = (cb: (line: string) => void) => { createInterface({ input: process.stdin }).on('line', cb); };
export const println = (s: string | number) => console.log(s);
export const print = (s: string):void => { process.stdout.write(s); };

export const max = <T>(...v: T[]):T => v.reduce((p, c) => c > p ? c : p, v[0]);
export const min = <T>(...v: T[]):T => v.reduce((p, c) => c < p ? c : p, v[0]);

type _QueueData<T> = {
  data: T;
  next: null | _QueueData<T> ;
};

export class Queue<T> {
  private _first: null | _QueueData<T>
  private _last: null | _QueueData<T>
  private _length = 0;
  
  constructor(data: T[] = []) {
    this._first = null;
    this._last = null;
    data.forEach(v => this.push(v));
  }
  
  push(v: T) {
    this._length++;
    const newNode = { data:v, next: null };
    if (this._first === null) {
      this._last = this._first = newNode;
      return this._length;
    }
    const last = this._last as _QueueData<T>;
    this._last = newNode;
    last.next = this._last;
    return this._length;
  }
  
  pop() {
    if (this._first === null) {
      throw new Error('Queue is empty');
    }
    this._length--;
    const result = this._first.data;
    this._first = this._first.next;
    return result;
  }

  clear() {
    this._length = 0;
    this._first = this._last = null;
  }

  get first() {
    if (this._first === null) {
      throw new Error('Queue is empty');
    }
    return this._first.data;
  }
  
  get length() {
    return this._length;
  }
};

export class Stack<T> {
  private data: T[];
  constructor(data: T[] = []) {this.data = data;};
  push(v: T) {
    this.data.push(v);
  }
  pop() {
    return this.data.pop();
  }
  get last() {
    return this.data.at(-1);
  }
  get length () {
    return this.data.length;
  }
};

export const round = (value: number, base: number) => {
  const b = 10 ** base;
  return Math.round(value * b) / b;
};