@classDecorator
class Boat {
  color: string = "red";

  get formatColor(): string {
    return `this boat's color is ${this.color}`;
  }
  //@myDecorator
  @logErr("errrrrrr nooooooo")
  pilot(@paramDecorator speed: string): void {
    //throw new Error("ooopppps error");
    if (speed === "fast") {
      console.log("swish!");
    } else {
      console.log("slowly moving");
    }
  }
}

// function myDecorator(target: any, key: string, desc: PropertyDescriptor): void {
//   console.log("Target", target);
//   console.log("Key", key);
// we can not do target.color - > we don't have access
// }

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

function paramDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

function logErr(errMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
    //  console.log(desc, "what is desc", desc.value);
    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log(errMessage);
      }
    };
  };
}

//new Boat().pilot();
