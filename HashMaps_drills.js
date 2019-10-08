const HashMap = require('./hashMap');

function main() {
  const lor = new HashMap();
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');
  console.log(lor);
  console.log(lor.get('Maiar'));
  console.log(lor.get('Hobbit'));
}
// main();

// when retrieving Maiar and Hobbit values, only getting second value of both of those keys -> Sauron and Frodo; because first values are being overwritten by the second values of that same key
// capcity is 24 because there are 9 key/value pairs and 15 empty slots in the hashtable

// 2
const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  // creates table with 2 values for the same key; so 10 is being overwritten and set to 20
  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  // creates new table with 2 values for the same key; so 20 is being overwritten by 10
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3,20);
  map2.set(str4,10);
  // shows that the first tables 1st pair has been set to 20 and the second tables 1st pair has been set to 10
  console.log(map1.get(str1));
  console.log(map2.get(str3));
};

// 3
/*
Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 
into a hash map of length m = 11 using open addressing and a hash function k mod m.
10%11 = 1
22%11 = 0
31%11 = 9
4%11 = 4
15%11 = 4
28%11 = 6
17%11 = 6
88%11 = 0
59%11 = 4

OPEN ADDRESSING
  | 22 | 10 | 88 |    |  4 | 15 | 28 | 17 |  59 | 31 |    |
    0     1   2     3    4    5    6    7    8    9   10

SEPARATE CHAINING
   | 22 | 10 |    |    |  4 |    | 28 |    |    | 31 |    |
   | 88 |    |    |    | 15 |    | 17 |    |    |    |    |
   |    |    |    |    | 59 |    |    |    |    |    |    |
   |    |    |    |    |    |    |    |    |    |    |    |
     0    1    2    3    4    5    6    7    8    9   10
 */

 
//  4
function removeDuplicate(string) {
  let hashMap = new HashMap();
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  let newString = '';
  for(let i = 0; i < string.length; i++) {
    try {
      hashMap.get(string[i]);
      console.log('already placed');
    }
    catch(e) {
      hashMap.set(string[i], string[i]);
      newString += string[i];
    }
  }
  return newString;
}

// console.log(removeDuplicate('google'));
// console.log(removeDuplicate('google all you can think of'));


// 5
function palindrome(string) {
  const hashMap = new HashMap();
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  let charCount = 0;
  for(let i = 0; i < string.length; i++) {
    try {
      hashMap.get(string[i]);
      charCount++;
    } catch(e) {
      hashMap.set(string[i], string[i]);
    }
  }
  if(charCount === hashMap.length-1 || charCount === hashMap.length) {
    return true;
  } else {
    return false;
  }
}
palindrome('acecarr'); //true because racecar
palindrome('north'); //false


function anagram(array) {
  // set hash map for everything in one loop
  // then loop through again and put anagrams together
  const hashMap = new HashMap();
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  // console.log(hashMap);
  let result = [];
  array.forEach(string => {
    let key = string.split('').sort().join('');
    console.log(key);
    let value = [];
    // console.log(string);
    try {
      // if get(key) equals an existing key want to create a new array for the values that fit into that key only
      // returns the value
      // console.log('.get',hashMap.get(key), 'key', key);
      if(hashMap.get(key) === key) {
        hashMap.get(key);
        value.push(string);
        // console.log(value);
        // storing multiple words in the hash map
        // console.log(value.push(string));
      } else {
        // do this part 1st
        hashMap.set(key, value);
        // console.log('key/value',key, value);
        value.push(string);
        result.push(value);
        // so the key is the right thing, but how do I store multiple values in that key?
      } 
    }
    catch(e) {
      // console.log(key);
      // if(key !== undefined) {
      value.push(string);
      hashMap.set(key, value);
      // console.log(key, value);
      // result.push(value);
      // }
    }
  });
  console.log(result);

  // want to push words with same letters into arrays
  // key of aest => ['east', 'teas', 'eats']
  // let value = [];
  // value.push('found word');
  // hashMap.set(key, value);
  // need to have key be alphabetical version of the letters in the word east -> aest

  // for(let i = 0; i < array.length; i++) {
  //   let key = array[i].split('').sort().join('');
  //   if(hashMap.get(key) === undefined) {
  //     hashMap.set(key, [array[i]]);
  //     result.push(key);
  //   } else {
  //     hashMap.set(key, [...hashMap.get(key), array[i]]);
  //   }
  // }
  // console.log(result.map((item) => hashMap.get(item)));
}
anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']); //[['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]