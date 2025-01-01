export default class Queue {
  constructor() {
    this.arr = [];
  }
  enqueue(data) {
    this.arr.push(data);
  }
  dequeu() {
    if (this.empty())
      return null;
    else {
      const removed = this.arr[0];
      this.arr.shift();
      return removed;
    }
  }
  peek() {
    this.empty() ? null : this.arr[0];
  }
  empty() {
    return this.arr.length == 0;
  }
  size() { return this.arr.length; }
}
