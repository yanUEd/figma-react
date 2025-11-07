# figma-react-layout

**AI-native Design-as-Code layout components inspired by Figma Auto Layout**

一套受 Figma Auto Layout 启发的 React 布局组件库，让"设计稿"这个中间产物消失，让设计语言与前端代码语言直接对齐。

## 🚀 特性

- **🎨 Figma 对齐**: 复刻 Figma Auto Layout 的使用体验
- **🔧 零配置**: 开箱即用，合理的默认值和智能回退机制
- **📱 TypeScript**: 完整的类型提示和检查
- **🎯 语义化**: 直观的属性名，一个属性表达完整意图
- **🎨 Token 驱动**: 统一的设计token确保视觉一致性
- **⚡ 高性能**: 最小化重复计算，优化重渲染

## 📦 安装

```bash
npm install figma-react-layout
# 或
yarn add figma-react-layout
# 或
pnpm add figma-react-layout
```

### 依赖要求

- React 16.8+ (需要 hooks 支持)
- Styled Components

## 🔧 基础使用

```jsx
import { Box, Column, Row, ZStack } from 'figma-react-layout';

function App() {
  const handleLogin = () => console.log('Login clicked');
  const handleCancel = () => console.log('Cancel clicked');

  return (
    <Column gap="$md" padding="$xl" alignment="center-center" minHeight="100vh">
      <Text type="title-lg">欢迎回来</Text>

      <Column gap="$sm" width="320px">
        <Input label="邮箱" />
        <Input label="密码" type="password" />
      </Column>

      <Row gap="$sm">
        <Button variant="secondary" onClick={handleCancel}>取消</Button>
        <Button variant="primary" onClick={handleLogin}>登录</Button>
      </Row>
    </Column>
  );
}
```

## 🖱️ onClick 事件处理

所有 figma-react-layout 组件都支持标准的 React onClick 事件处理器，就像普通 HTML 元素一样。

### 基础用法

```jsx
import { Box, Column, Row, ZStack } from 'figma-react-layout';

function ClickableExample() {
  const handleBoxClick = (event) => {
    console.log('Box clicked!', event.target);
  };

  const handleColumnClick = () => {
    alert('Column container clicked!');
  };

  const handleRowClick = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
    console.log('Row coordinates:', event.clientX, event.clientY);
  };

  return (
    <Column gap="20px" padding="20px">
      {/* Box 点击 */}
      <Box
        width="200px"
        height="80px"
        fill="blue"
        onClick={handleBoxClick}
        style={{ cursor: 'pointer' }}
      >
        Click this Box
      </Box>

      {/* Column 点击 */}
      <Column
        width="250px"
        height="120px"
        fill="green"
        onClick={handleColumnClick}
        alignment="center-center"
        gap="10px"
      >
        <Box height="30px" fill="white">Item 1</Box>
        <Box height="30px" fill="lightgreen">Item 2</Box>
      </Column>

      {/* Row 点击 */}
      <Row
        width="300px"
        height="80px"
        fill="orange"
        onClick={handleRowClick}
        alignment="center-center"
        gap="20px"
      >
        <Box width="60px" height="50px" fill="white">Left</Box>
        <Box width="60px" height="50px" fill="yellow">Right</Box>
      </Row>

      {/* ZStack 点击 */}
      <ZStack
        width="200px"
        height="120px"
        onClick={() => console.log('ZStack clicked')}
      >
        <Box position="absolute" width="100%" height="100%" fill="lightgray" />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="100px"
          height="60px"
          fill="purple"
          alignment="center-center"
        >
          Stacked
        </Box>
      </ZStack>
    </Column>
  );
}
```

### 高级用法

#### 使用 useCallback 优化性能

```jsx
import React, { useCallback } from 'react';

function OptimizedExample({ data }) {
  const handleClick = useCallback((event) => {
    console.log('Clicked with data:', data);
  }, [data]);

  return (
    <Box
      width="200px"
      height="80px"
      fill="blue"
      onClick={handleClick}
    >
      Optimized Click
    </Box>
  );
}
```

#### 嵌套组件事件处理

```jsx
function NestedExample() {
  const handleParentClick = () => console.log('Parent clicked');
  const handleChildClick = (event) => {
    event.stopPropagation(); // 阻止触发父级点击
    console.log('Child clicked only');
  };

  return (
    <Column
      width="300px"
      height="150px"
      fill="lightblue"
      onClick={handleParentClick}
    >
      <Box
        height="50px"
        fill="red"
        onClick={handleChildClick}
      >
        Child (only fires this)
      </Box>
      <Box
        height="50px"
        fill="green"
      >
        Child (bubbles to parent)
      </Box>
    </Column>
  );
}
```

#### 可访问性支持

```jsx
function AccessibleExample() {
  const handleClick = () => console.log('Accessible click');

  return (
    <Box
      width="200px"
      height="60px"
      fill="blue"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      Accessible Button
    </Box>
  );
}
```

### 测试 onClick 处理器

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Box } from 'figma-react-layout';

test('onClick handler works', () => {
  const handleClick = jest.fn();

  render(
    <Box
      data-testid="clickable-box"
      onClick={handleClick}
    >
      Click me
    </Box>
  );

  const box = screen.getByTestId('clickable-box');
  fireEvent.click(box);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**详细文档**: 参见 [onClick 事件处理指南](doc/onClick-handlers.md)

**在线示例**:
- [onClick 示例页面](test/onClick-examples.html)
- [onClick 调试面板](test/onClick-debug.html)

## 📚 组件文档

### Box - 基础容器组件

最通用的视觉容器，用于包裹内容或定义卡片、面板、背景块。

```jsx
<Box
  width="200px"
  height="100px"
  minWidth="150px"
  maxWidth="300px"
  alignment="center-center"
  distribution="space-between"
  gap="$md"
  padding="x:$lg y:$sm"
  fill="$surface"
  strokeColor="$border"
  strokeWeight="$sm"
  strokeStyle="dashed"
  radius="$md"
  overflow="hidden"
>
  内容
</Box>
```

### Column - 垂直布局容器

将多个子元素垂直堆叠，自动管理间距与对齐。

```jsx
<Column gap="$md" alignment="center-center">
  <Box>项目 1</Box>
  <Box>项目 2</Box>
  <Box>项目 3</Box>
</Column>
```

### Row - 水平布局容器

让元素在水平方向排列，支持自动换行。

```jsx
<Row gap="$sm" wrap="true" alignment="center-center">
  <Tag>标签 1</Tag>
  <Tag>标签 2</Tag>
  <Tag>标签 3</Tag>
</Row>
```

### ZStack - 层叠布局容器

将多个子元素按层叠方式排列，先定义的元素在上层。

```jsx
<ZStack width="200px" height="150px">
  <Box alignment="top-right" fill="$error" radius="full" width="16px" height="16px">
    <Text color="white" type="body-xs">3</Text>
  </Box>
  <Button variant="ghost">
    <Icon name="notification" />
  </Button>
</ZStack>
```

## 🎨 Token 系统

### 基础 Token

```css
:root {
  /* 间距 */
  --xs: 4px;
  --sm: 8px;
  --md: 16px;
  --lg: 24px;
  --xl: 32px;

  /* 颜色 */
  --primary: #0066ff;
  --secondary: #6c757d;
  --surface: #ffffff;
  --border: #e9ecef;
  --error: #dc3545;
  --muted: #6c757d;

  /* 圆角 */
  --none: 0;
  --sm: 4px;
  --md: 8px;
  --lg: 16px;
  --full: 50%;
}
```

### 使用 Token

```jsx
<Box padding="$lg" fill="$surface" strokeColor="$border" radius="$md">
  {/* 自动转换为 CSS 变量 */}
</Box>
```

## 🎯 方向控制语法

### 边距控制

```jsx
<Box padding="x:$lg y:$sm">     {/* 水平$lg，垂直$sm */}
<Box padding="top:20px right:10px bottom:20px left:10px"> {/* 精确控制 */}>
```

### 边框控制

```jsx
<Box
  strokeColor="top:$primary right:$secondary"
  strokeWeight="top:2px right:1px"
  strokeStyle="top:solid right:dashed"
>
  {/* 上边框：2px solid primary */}
  {/* 右边框：1px dashed secondary */}
</Box>
```

### 圆角控制

```jsx
<Box radius="top-right:$md bottom-left:$lg">
  {/* 右上角：md */}
  {/* 左下角：lg */}
  {/* 其他角：0 */}
</Box>
```

## 🤖 智能默认值

Stroke 属性智能默认值：当任何 stroke 属性被设置时，其他缺失属性自动补充默认值：

```jsx
// 只设置颜色，自动补充：weight="1px", style="solid"
<Box strokeColor="$primary" />

// 只设置粗细，自动补充：color="$border", style="solid"
<Box strokeWeight="2px" />

// 只设置样式，自动补充：color="$border", weight="1px"
<Box strokeStyle="dashed" />
```

## 🔄 Overflow 智能映射

根据容器类型，overflow 属性智能映射到不同 CSS 实现：

```jsx
// Box: 直接映射
<Box overflow="hidden" />  // → overflow: hidden

// Column: 垂直方向控制
<Column overflow="auto" />  // → overflow-x: visible, overflow-y: auto

// Row: 水平方向控制
<Row overflow="auto" />     // → overflow-x: auto, overflow-y: visible
```

## 📏 尺寸控制

### 基础尺寸

```jsx
<Box width="fill" height="hug">  {/* 宽度填满，高度适应内容 */}
<Box width="200px" height="100px">  {/* 固定尺寸 */}
```

### 尺寸约束

```jsx
<Box
  width="fill"
  minWidth="200px"
  maxWidth="400px"
  height="hug"
  minHeight="100px"
  maxHeight="300px"
>
  响应式尺寸约束
</Box>
```

## 🎨 自定义主题

```jsx
import { ThemeProvider } from 'styled-components';

const customTheme = {
  spacing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
  colors: {
    primary: '#your-brand-color',
    surface: '#your-surface-color',
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* 你的组件 */}
    </ThemeProvider>
  );
}
```

## 📖 完整 API

### 共同属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width/height` | `'fill' \| 'hug' \| string` | `'hug'` | 尺寸控制 |
| `minWidth/maxWidth` | `string \| null` | `null` | 宽度约束 |
| `minHeight/maxHeight` | `string \| null` | `null` | 高度约束 |
| `alignment` | `Alignment` | `'top-left'` | 9点对齐 |
| `gap` | `string` | `'0'` | 子元素间距 |
| `padding` | `string` | `'0'` | 内边距（支持方向控制） |
| `fill` | `string \| null` | `null` | 背景色 |
| `strokeColor` | `string \| null` | `null` | 边框颜色（支持方向控制） |
| `strokeWeight` | `string \| null` | `null` | 边框粗细（支持方向控制） |
| `strokeStyle` | `StrokeStyle \| null` | `null` | 边框样式 |
| `radius` | `string \| null` | `null` | 圆角（支持方向控制） |
| `opacity` | `string \| null` | `null` | 透明度 |
| `overflow` | `Overflow` | `'hidden'` | 溢出处理 |

### Row 特有属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `wrap` | `'true' \| 'false'` | `'false'` | 是否自动换行 |

## 🆚 对比传统方案

### 我们的方案 - 语义化、简洁

```jsx
<Column gap="$lg" padding="$xl" alignment="center-center" minHeight="100vh">
  <Text type="title-lg">欢迎回来</Text>
  <Column gap="$md" width="320px">
    <Input label="邮箱" />
    <Input label="密码" type="password" />
  </Column>
  <Row gap="$sm">
    <Button variant="secondary">取消</Button>
    <Button variant="primary">登录</Button>
  </Row>
</Column>
```

### Tailwind 方案 - 冗长、难维护

```jsx
<div className="flex flex-col items-center justify-center gap-6 p-8 min-h-screen">
  <h1 className="text-xl font-semibold">欢迎回来</h1>
  <div className="flex flex-col gap-4 w-80">
    <div className="space-y-2">
      <label className="text-sm font-medium">邮箱</label>
      <input className="w-full px-3 py-2 border rounded-md" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">密码</label>
      <input className="w-full px-3 py-2 border rounded-md" type="password" />
    </div>
  </div>
  <div className="flex gap-2">
    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">取消</button>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">登录</button>
  </div>
</div>
```

**优势对比**：
- **代码量**: 我们的方案节省 60% 代码量
- **可读性**: `alignment="center-center"` vs `items-center justify-center`
- **一致性**: 统一的 `$lg` token vs 混合的 `p-8 gap-6 gap-4`
- **维护性**: 修改间距只需改一个 token

## 🚀 集成到现有项目

### 1. 安装依赖

```bash
npm install figma-react-layout styled-components
```

### 2. 设置 CSS 变量（可选）

```css
/* 在你的全局CSS中 */
:root {
  --xs: 4px;
  --sm: 8px;
  --md: 16px;
  --lg: 24px;
  --xl: 32px;

  --primary: #0066ff;
  --surface: #ffffff;
  --border: #e9ecef;
  --error: #dc3545;
  --muted: #6c757d;

  --none: 0;
  --sm: 4px;
  --md: 8px;
  --lg: 16px;
  --full: 50%;
}
```

### 3. 开始使用

```jsx
import { Box, Column, Row } from 'figma-react-layout';

// 直接替换原有的 div 和样式
function MyComponent() {
  return (
    <Column gap="$md" padding="$lg">
      <Box fill="$surface" strokeColor="$border" radius="$md">
        内容
      </Box>
    </Column>
  );
}
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 🔗 相关链接

- [API 规范文档](./doc/API%20规范.md)
- [GitHub 仓库](https://github.com/figma-react/layout)
- [npm 包](https://www.npmjs.com/package/figma-react-layout)