class Stack{
    constructor(){
        this._items = [];
    }

    get is_empty() {
        return this._items.length == 0 ? true : false;
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
        return this._elements.length == 0 ? true : false;
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
