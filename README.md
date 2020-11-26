# @typedninja/pullable-cron

> Cron transformations for @typedninja/pullable

## Install

```
$ yarn add @typedninja/pullable-cron

$ npm install --save @typedninja/pullable-cron
```

## Usage

Provides the `cron` transformer which allows you to delay and repeat iteration
by providing a cron-like expression.

Also see the [API documentation](https://typed.ninja/pullable-cron/).

```typescript
import { from } from "@typedninja/pullable";
import { cron } from "@typedninja/pullable-cron";

const cronified = from([ 1, 2, 3, 4 ]).pipe(
  cron("* * * * * *"),
);

for await (const num of cronified) {
  console.log(num);
}
```

This transformer uses [cron-parser](https://www.npmjs.com/package/cron-parser)
under the hood and like that module also accepts an options parameter.
See the cron-parser documentation for more information about allowed options.

```typescript
const cronified = from([ 1, 2, 3, 4 ]).pipe(
  cron("* * * * * *", { currentDate: new Date() }),
);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## See also

  * [@typedninja/pullable](https://www.npmjs.com/package/@typedninja/pullable)
  * [cron-parser](https://www.npmjs.com/package/cron-parser)