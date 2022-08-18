class Stack{
    constructor(){
        this._items = [];
    }

    get is_empty() {
        return this._items.length === 0 ? true : false;
    }

    get items(){
        return this._items;
    }

    push(item){
        this._items.push(item);
    }

    pop(){
        return this._items.pop();
    }
}

class Queue{
    constructor(){
        this._elements = [];
    }

    get is_empty() {
        return this._elements.length === 0 ? true : false;
    }

    get elements(){
        return this._elements;
    }

    enqueue(item){
        this._elements.push(item);
    }

    dequeue(){
        return this._elements.shift();
    }

    peek(){
        return this._elements[0];
    }
}


class Heap{
    constructor(){
        this._elements = [];
    }

    get is_empty(){
        return this._elements.length === 0 ? true : false;
    }

    get elements(){
        return this._elements;
    }

    put(priority, item){
        this._elements.push([priority, item]);
        this.quickSort();
    }

    get(){
        return this._elements.shift()[1];
    }

    quickSort(){
        this._elements.sort(function (a, b){
            return a[0] - b[0];
        });
    }
}

// let hl = [
//     [14, [2, 1]],
//     [1, [0, 1]],
//     [2, [5, 4]],
//     [14, [1, 2]],
//     [5, [0, 1]],
//     [2, [22, 15]],
//     [2, [21, 24]]
// ]

// let pq = new Heap();
// pq.put(14, [2, 1]);
// pq.put(1, [0, 1]);
// pq.put(2, [5, 4]);
// pq.put(14, [1, 2]);
// pq.put(5, [0, 1]);
// pq.put(2, [22, 15]);
// pq.put(2, [21, 24]);

// console.table(hl);

// hl.sort(function (a,b){
//     return a[0] - b[0];
// });

// console.table(hl);

// console.table(pq.elements);
// 
