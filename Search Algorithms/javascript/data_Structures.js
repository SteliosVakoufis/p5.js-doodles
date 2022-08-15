class Stack{
    constructor(){
        this._items = [];
    }

    get is_empty() {
        return this._items.length == 0 ? true : false;
    }

    push(item){
        this._items.push(item);
    }

    pop(){
        return this._items.pop();
    }

}