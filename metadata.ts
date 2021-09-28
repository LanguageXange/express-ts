// this is a file to learn more about the basics of metadata
// npm install reflect-metadata

import "reflect-metadata";
// it adds Reflect variable to the global scope

// const plane = {
//   color: "red",
// };

// Reflect.defineMetadata("note", "value of the note blah", plane);
// //console.log(plane); // you won't see note in plane

// const mynote = Reflect.getMetadata("note", plane);
// console.log(mynote);

// ---- Lecture Practical Metadata

@printMetadata
class Plane {
  color: string = "red";

  @markFunction(12345)
  fly(): void {
    console.log("vrrrr");
  }

  @markFunction(78912)
  stop(): void {
    console.log("stopppp");
  }
}

function markFunction(info: number) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata("secret", info, target, key);
  };
}

// referring to the constructor function
function printMetadata(target: typeof Plane) {
  // iterating through different keys in the prototype
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata("secret", target.prototype, key);
    console.log(secret);
  }
}
