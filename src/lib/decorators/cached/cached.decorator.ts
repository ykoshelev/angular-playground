export function Cached() {
  const buffer = new Map();

  const handleMemoryMap = (args: any[], origin: FunctionConstructor) => {
    let argMap: Map<any, any>;

    if (buffer.has(origin)) {
      argMap = buffer.get(origin);
    } else {
      argMap = new Map();
      buffer.set(origin, argMap);
    }

    for (let i = 0; i <= args.length; i++) {
      if (i === args.length - 1) {
        if (argMap.has(args[i])) {
          return argMap.get(args[i]);
        } else {
          const result = origin.apply(this, args);

          argMap.set(args[i], result);
          return result;
        }
      }

      if (argMap.has(args[i])) {
        argMap = argMap.get(args[i]);
      } else {
        const map = new Map();
        argMap.set(args[i], map);

        argMap = map;
      }
    }
  };

  return (constructor, name, descriptor) => {
    const origin = descriptor.value;

    descriptor.value = (...args) => handleMemoryMap(args, origin);
  };
}