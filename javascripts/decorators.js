function getPropertyDescriptor (obj, property) {
  if (obj == null) return null;

  const descriptor = Object.getOwnPropertyDescriptor(obj, property);

  if (obj.hasOwnProperty(property))
    return Object.getOwnPropertyDescriptor(obj, property);
  else return getPropertyDescriptor(Object.getPrototypeOf(obj), property);
};

const after = (behaviour, ...methodNames) =>
  (clazz) => {
    for (let methodNameExpr of methodNames) {
      const [_, accessor, methodName] = methodNameExpr.match(/^(?:(get|set) )(.+)$/);
      const descriptor = getPropertyDescriptor(clazz.prototype, methodName);


      if (accessor == null) {
        const method = clazz.prototype[methodName];

        descriptor.value = function (...args) {
          const returnValue = method.apply(this, args);

          behaviour.apply(this, args);
          return returnValue;
        };
        descriptor.writable = true;
      }
      else if (accessor === "get") {
        const method = descriptor.get;

        descriptor.get = function (...args) {
          const returnValue = method.apply(this, args);

          behaviour.apply(this, args);
          return returnValue;
        };
        descriptor.configurable = true;
      }
      else if (accessor === "set") {
        const method = descriptor.set;

        descriptor.set = function (...args) {
          const returnValue = method.apply(this, args);

          behaviour.apply(this, args);
          return returnValue;
        };
        descriptor.configurable = true;
      }
      Object.defineProperty(clazz.prototype, methodName, descriptor);
    }
    return clazz;
  }

  exports = after;
