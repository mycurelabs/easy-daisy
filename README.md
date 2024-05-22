# 🌼 Easy Daisy

Vue.js 3 Component Collection for DaisyUI

## Installation

```bash
npm install @mycure/easy-daisy
```

## Usage

### EasySelect

**Component**

```vue
<script setup>
import { EasySelect } from '@mycure/easy-daisy';

const model = ref('Option 1');
const options = [
  {
    label: 'Option 1',
    value: 'Option 1',
  },
  {
    label: 'Option 2',
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 'Option 3',
  },
];

</script>

<template>
  <EasySelect v-model="model" :options="options" />

  <p>Selected: {{ model }}</p>
</template>
```
**Props**

| Prop Name             | Type                            | Default Value               | Description                      |
|-----------------------|---------------------------------|-----------------------------|----------------------------------|
| `asyncSearch`         | `Boolean`                       | `false`                      | Enable asynchronous search.      |
| `clearable`           | `Boolean`                       | `false`                      | Allow clearing the selection.    |
| `disabled`            | `Boolean`                       | `false`                      | Disable the component.           |
| `errors`              | `Array`                         | `[]`                         | Error messages to display.       |
| `label`               | `String`                        | `''`                         | Label for the component.         |
| `loading`             | `Boolean`                       | `false`                      | Show loading indicator.          |
| `options`             | `Array`                         | `[]`                         | The options to display.          |
| `placeholder`         | `String`                        | `'Select an option'`         | Placeholder text for the input.  |
| `required`            | `Boolean`                       | `false`                      | Make the field required.         |
| `requiredErrorMessage`| `String`                        | `'This field is required'`   | Error message for required field.|
| `returnObject`        | `Boolean`                       | `false`                      | Return the entire option object. |
| `searchable`          | `Boolean`                       | `true`                       | Enable search functionality.     |
| `searchPlaceholder`   | `String`                        | `'Type to search'`           | Placeholder text for search.     |

**Events**

| Event Name            | Description                      |
|-----------------------|----------------------------------|
| `search`              | Emitted when the search query changes. |

### EasyMultipleSelect

**Component**

```vue
<script setup>
import { EasyMultipleSelect } from '@mycure/easy-daisy';

const model = ref(['Option 1']);

const options = [
  {
    label: 'Option 1',
    value: 'Option 1',
  },
  {
    label: 'Option 2',
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 'Option 3',
  },
];

</script>

<template>
  <EasyMultipleSelect v-model="model" :options="options" />
  <p>Selected: {{ model }}</p>
</template>
```

**Props**

| Prop Name              | Type     | Default Value            | Description                          |
|------------------------|----------|--------------------------|--------------------------------------|
| `asyncSearch`          | `Boolean`| `false`                  | Enable asynchronous search.          |
| `clearable`            | `Boolean`| `false`                  | Allow clearing the selection.        |
| `disabled`             | `Boolean`| `false`                  | Disable the component.               |
| `errors`               | `Array`  | `[]`                     | Error messages to display.           |
| `label`                | `String` | `''`                     | Label for the component.             |
| `loading`              | `Boolean`| `false`                  | Show loading indicator.              |
| `options`              | `Array`  | `[]`                     | The options to display.              |
| `placeholder`          | `String` | `'Select options'`       | Placeholder text for the input.      |
| `required`             | `Boolean`| `false`                  | Make the field required.             |
| `requiredErrorMessage` | `String` | `'This field is required'`| Error message for required field.    |
| `returnObject`         | `Boolean`| `false`                  | Return the entire option object.     |
| `searchable`           | `Boolean`| `true`                   | Enable search functionality.         |
| `searchPlaceholder`    | `String` | `'Type to search'`       | Placeholder text for search.         |
| `unique`               | `Boolean`| `true`                   | Ensure selected options are unique.  |

**Events**

| Event Name            | Description                      |
|-----------------------|----------------------------------|
| `search`              | Emitted when the search query changes. |

### EasyCombobox

**Component**

```vue
<script setup>
import { EasyCombobox } from '@mycure/easy-daisy';

const model = ref('Option 1');

const options = [
  {
    label: 'Option 1',
    value: 'Option 1',
  },
  {
    label: 'Option 2',
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 'Option 3',
  },
];
</script>

<template>
  <EasyCombobox v-model="model" :options="options" />
  <p>Selected: {{ model }}</p>
</template>
```

**Props**

| Prop Name              | Type     | Default Value            | Description                          |
|------------------------|----------|--------------------------|--------------------------------------|
| `clearable`            | `Boolean`| `false`                  | Allow clearing the selection.        |
| `disabled`             | `Boolean`| `false`                  | Disable the component.               |
| `errors`               | `Array`  | `[]`                     | Error messages to display.           |
| `label`                | `String` | `''`                     | Label for the component.             |
| `loading`              | `Boolean`| `false`                  | Show loading indicator.              |
| `placeholder`          | `String` | `'Select options'`       | Placeholder text for the input.      |
| `required`             | `Boolean`| `false`                  | Make the field required.             |
| `requiredErrorMessage` | `String` | `'This field is required'`| Error message for required field.    |
| `returnObject`         | `Boolean`| `false`                  | Return the entire option object.     |
| `unique`               | `Boolean`| `true`                   | Ensure selected options are unique.  |

**Events**

| Event Name            | Description                      |
|-----------------------|----------------------------------|
| `search`              | Emitted when the search query changes. |

Made with ❤️ by [MYCURE](https://mycure.md)