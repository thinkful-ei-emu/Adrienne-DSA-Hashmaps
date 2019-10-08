class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this.deleted = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  // might need to change this one too 
  get(key) {
    const index = this._findSlot(key);
    if(this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this._hashTable[index].value;
  }

  // need to be changed for chaining
  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if(loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);

    if(!this._hashTable[index]) {
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }

  // needs to be changed for chaining
  // _findSlot(key) {
  //   const hash = HashMap._hashString(key);
  //   const start = hash % this._capacity;
  //   for (let i = start; i < start + this._capacity; i++) {
  //     const index = i % this._capacity;
  //     const slot = this._hashTable[index];
  //     if(slot === undefined || (slot.key === key && !slot.DELETED)) {
  //       return index;
  //     }
  //   }

  // if a second one comes around for that same spot in the hash table want to redefine start as the head; how we did linked lists was to create a new constructor that had the next and value as part of the node and the head as part of the linked list class
  // does this mean I need to create a new class here? that seems excessive for this
  // seems from diagram that would take the head and not have a value for that, just be a pointer to the next item which would be the first thing in the linked list
  // then that next pointer would point to the next thing and so on

  // }

  put(item) {
    
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];
    for (const slot of oldSlots) {
      if(slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }

  // might need to change this one too
  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if(slot === undefined) {
      throw new Error ('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }
}

module.exports = HashMap;