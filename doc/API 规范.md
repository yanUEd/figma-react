我们先来定义这套系统的核心基础层 —— **Layout 原子组件 API 规范**。
目标是：
> 复刻 Figma Auto Layout 的使用体验，在 React 中实现等价的布局与视觉控制能力。

---

# 🧱 Design-Aligned Layout API 规范（v0.1）

## 概览

本规范定义了四个基础组件：
`<Box>`、`<Column>`、`<Row>`、`<ZStack>`

* 全部组件的属性命名、取值范围、语义均参考 Figma 属性面板。
* 统一使用 design tokens（spacing、radius、color、elevation、font 等）。
* 支持通过 props 进行微调（对齐、内边距、圆角等），无需写样式。

---

## 1️⃣ `<Box>` — 基础容器组件

Figma 对应：**Frame / Rectangle**

### 用途

最通用的视觉容器，用于包裹内容或定义卡片、面板、背景块。

### Props

| 属性 | 类型 | 默认值 | 对应 Figma | 示例 | 说明 |
|------|------|--------|------------|------|------|
| **布局属性** |||||||
| `width`/`height` | `'fill' \| 'hug' \| string` | `'hug'` | Width/Height | `width="fill"` | 尺寸（fill填充父容器，hug适应内容） |
| `alignment` | `'top-left' \| 'top-center' \| 'top-right' \| 'center-left' \| 'center-center' \| 'center-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-left'` | Align | `alignment="center-center"` | 9点对齐方式 |
| `distribution` | `'pack' \| 'center' \| 'space' \| 'space-between'` | `'pack'` | Distribute | `distribution="space-between"` | 子元素分布方式 |
| `gap` | `string` | `'0'` | Item Spacing | `gap="$md"` | 子元素间距 |
| `padding` | `string` | `'0'` | Padding | `padding="x:$lg y:$sm"` | 内边距（支持方向控制） |
| `clipContent` | `'true' \| 'false'` | `'true'` | Clip Content | `clipContent="true"` | 裁剪超出内容（对应Figma Clip Content） |
| **视觉属性** |||||||
| `fill` | `string \| null` | `null` | Fill | `fill="$surface"` | 填充色（null表示无背景色） |
| `strokeColor` | `string \| null` | `null` | Stroke Color | `strokeColor="$primary"` | 边框颜色（支持方向控制） |
| `strokeWeight` | `string \| null` | `null` | Stroke Weight | `strokeWeight="$md"` | 边框粗细（支持方向控制） |
| `strokeStyle` | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'groove' \| 'ridge' \| 'inset' \| 'outset' \| null` | `null` | Stroke Style | `strokeStyle="dashed"` | 边框样式（支持方向控制） |
| `radius` | `string \| null` | `null` | Corner Radius | `radius="$md"` | 圆角（null表示无圆角） |
| `opacity` | `string \| null` | `null` | Opacity | `opacity="0.8"` | 透明度（null表示无透明度设置） |

### 智能默认值机制

**Stroke属性智能默认值**：当任何stroke属性被设置且不为null时，其他缺失的stroke属性将自动补充默认值：

- **缺失strokeColor** → 自动使用 `$border`（如果token未定义则回退到 `#000000`）
- **缺失strokeWeight** → 自动使用 `1px`
- **缺失strokeStyle** → 自动使用 `solid`

**使用示例**：
```tsx
// 只设置颜色，自动补充：weight="1px", style="solid"
<Box strokeColor="$primary" />

// 只设置粗细，自动补充：color="$border"→黑色, style="solid"
<Box strokeWeight="2px" />

// 只设置样式，自动补充：color="$border"→黑色, weight="1px"
<Box strokeStyle="dashed" />
```

### 方向控制语法

支持属性：`padding`, `strokeColor`, `strokeWeight`, `strokeStyle`, `radius`

- **全方向**：`"$lg"` 或 `"10px"`
- **方向控制**：使用 `direction:value` 格式

#### 方向选项
**边方向**（所有属性）：
- `top`, `right`, `bottom`, `left`
- `x`(水平), `y`(垂直)

**角落方向**（仅radius属性）：
- `top-left`, `top-right`, `bottom-left`, `bottom-right`

#### 组合示例
- `padding="x:10px y:$sm"`
- `strokeColor="top:$border right:$primary"`
- `radius="top-right:$md bottom-left:$sm"`

### 值格式规范

- **Token值**：使用 `$` 前缀，如 `$md`, `$primary`, `$surface`
- **自定义值**：直接使用CSS原生值，如 `8px`, `#ffffff`, `0.8`
- **null值**：表示"不应用此效果"（用于装饰性属性）

### Token回退机制

**Token优先级**：用户设置值 → design token → 黑色回退

- **Color Token回退**：当color token未定义或为空时，自动回退到 `#000000`（黑色）
- **应用场景**：主要用于strokeColor的智能默认值 `$border` token

**回链示例**：
```tsx
// 如果 $border token未定义，回退到黑色边框
<Box strokeWeight="1px" />  // 自动使用 strokeColor="#000000"

// 如果 $primary token未定义，回退到黑色
<Box strokeStyle="dashed" />  // 自动使用 strokeColor="#000000"
```

### 类型定义

```typescript
// 属性类型分类：
// 严格枚举：alignment (9种), distribution (4种), clipContent (2种), width/height (fill/hug)
// 字符串+token：gap, padding
// 字符串+null：fill, strokeColor, strokeWeight, radius, opacity

// alignment 9点对齐：
// 'top-left' | 'top-center' | 'top-right'
// 'center-left' | 'center-center' | 'center-right'
// 'bottom-left' | 'bottom-center' | 'bottom-right'

// distribution 分布方式：
// 'pack' (紧密排列) → flex-start
// 'center' (整体居中) → center
// 'space' (空间环绕) → space-around
// 'space-between' (两端对齐) → space-between

// 方向控制语法：
// padding, strokeColor, strokeWeight：支持边方向 (top, right, bottom, left, x, y)
// radius：支持边方向 + 角落方向 (top-left, top-right, bottom-left, bottom-right)
// 格式："direction:value"，空格分隔多个方向
// 示例：padding="x:$lg y:$sm", strokeColor="top:$border", radius="top-right:$md"
```


---

## 2️⃣ `<Column>` — 垂直布局容器

Figma 对应：**Auto Layout (Vertical)**

### 用途

将多个子元素垂直堆叠，自动管理间距与对齐。

### Props

继承 `<Box>` 的全部属性，无需额外属性。

| 属性 | 类型 | 默认值 | 对应 Figma | 示例 | 说明 |
|------|------|--------|------------|------|------|
| **继承属性** | | | | | |
| `width`/`height` | `'fill' \| 'hug' \| string` | `'hug'` | Width/Height | `width="fill"` | 尺寸（fill填充父容器，hug适应内容） |
| `alignment` | `'top-left' \| 'top-center' \| 'top-right' \| 'center-left' \| 'center-center' \| 'center-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-left'` | Align | `alignment="center-center"` | 子元素在Column中的对齐方式 |
| `gap` | `string` | `'0'` | Item Spacing | `gap="$md"` | 子元素间距 |
| `padding` | `string` | `'0'` | Padding | `padding="$lg"` | 内边距（支持方向控制） |
| `fill` | `string \| null` | `null` | Fill | `fill="$surface"` | 填充色（null表示无背景色） |
| `strokeColor` | `string \| null` | `null` | Stroke Color | `strokeColor="$primary"` | 边框颜色（支持方向控制） |
| `strokeWeight` | `string \| null` | `null` | Stroke Weight | `strokeWeight="$md"` | 边框粗细（支持方向控制） |
| `strokeStyle` | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'groove' \| 'ridge' \| 'inset' \| 'outset' \| null` | `null` | Stroke Style | `strokeStyle="dashed"` | 边框样式（支持方向控制） |
| `radius` | `string \| null` | `null` | Corner Radius | `radius="$md"` | 圆角（null表示无圆角） |
| `opacity` | `string \| null` | `null` | Opacity | `opacity="0.8"` | 透明度（null表示无透明度设置） |
| `clipContent` | `'true' \| 'false'` | `'true'` | Clip Content | `clipContent="true"` | 裁剪超出内容（对应Figma Clip Content） |


---

## 3️⃣ `<Row>` — 水平布局容器

Figma 对应：**Auto Layout (Horizontal)**

### 用途

让元素在水平方向排列。

### Props

继承 `<Box>` 的全部属性，新增以下：

| 属性 | 类型 | 默认值 | 对应 Figma | 示例 | 说明 |
|------|------|--------|------------|------|------|
| **新增属性** | | | | | |
| `wrap` | `'true' \| 'false'` | `'false'` | - | `wrap="true"` | 是否自动换行 |
| **继承属性** | | | | | |
| `width`/`height` | `'fill' \| 'hug' \| string` | `'hug'` | Width/Height | `width="fill"` | 尺寸（fill填充父容器，hug适应内容） |
| `alignment` | `'top-left' \| 'top-center' \| 'top-right' \| 'center-left' \| 'center-center' \| 'center-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-left'` | Align | `alignment="center-center"` | 子元素在Row中的对齐方式 |
| `gap` | `string` | `'0'` | Item Spacing | `gap="$md"` | 子元素间距 |
| `padding` | `string` | `'0'` | Padding | `padding="$lg"` | 内边距（支持方向控制） |
| `fill` | `string \| null` | `null` | Fill | `fill="$surface"` | 填充色（null表示无背景色） |
| `strokeColor` | `string \| null` | `null` | Stroke Color | `strokeColor="$primary"` | 边框颜色（支持方向控制） |
| `strokeWeight` | `string \| null` | `null` | Stroke Weight | `strokeWeight="$md"` | 边框粗细（支持方向控制） |
| `strokeStyle` | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'groove' \| 'ridge' \| 'inset' \| 'outset' \| null` | `null` | Stroke Style | `strokeStyle="dashed"` | 边框样式（支持方向控制） |
| `radius` | `string \| null` | `null` | Corner Radius | `radius="$md"` | 圆角（null表示无圆角） |
| `opacity` | `string \| null` | `null` | Opacity | `opacity="0.8"` | 透明度（null表示无透明度设置） |
| `clipContent` | `'true' \| 'false'` | `'true'` | Clip Content | `clipContent="true"` | 裁剪超出内容（对应Figma Clip Content） |


---

## 4️⃣ `<ZStack>` — 层叠布局容器

Figma 对应：**Frame with Absolute Positioning**

### 用途

将多个子元素按层叠方式排列，**先定义的元素在上层**，符合设计师的图层习惯。适用于卡片角标、图片覆盖、加载状态等场景。

### Props

继承 `<Box>` 的全部属性，无需额外属性。

| 属性 | 类型 | 默认值 | 对应 Figma | 示例 | 说明 |
|------|------|--------|------------|------|------|
| **继承属性** | | | | | |
| `width`/`height` | `'fill' \| 'hug' \| string` | `'hug'` | Width/Height | `width="200px"` | 尺寸（层叠容器尺寸） |
| `alignment` | `'top-left' \| 'top-center' \| 'top-right' \| 'center-left' \| 'center-center' \| 'center-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-left'` | Align | `alignment="center-center"` | 默认子元素对齐方式 |
| `padding` | `string` | `'0'` | Padding | `padding="$lg"` | 内边距（支持方向控制） |
| `fill` | `string \| null` | `null` | Fill | `fill="$surface"` | 填充色（null表示无背景色） |
| `strokeColor` | `string \| null` | `null` | Stroke Color | `strokeColor="$primary"` | 边框颜色（支持方向控制） |
| `strokeWeight` | `string \| null` | `null` | Stroke Weight | `strokeWeight="$md"` | 边框粗细（支持方向控制） |
| `strokeStyle` | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'groove' \| 'ridge' \| 'inset' \| 'outset' \| null` | `null` | Stroke Style | `strokeStyle="dashed"` | 边框样式（支持方向控制） |
| `radius` | `string \| null` | `null` | Corner Radius | `radius="$md"` | 圆角（null表示无圆角） |
| `opacity` | `string \| null` | `null` | Opacity | `opacity="0.8"` | 透明度（null表示无透明度设置） |
| `clipContent` | `'true' \| 'false'` | `'true'` | Clip Content | `clipContent="true"` | 裁剪超出内容（对应Figma Clip Content） |

**使用说明**：
- **子元素定位**：通过Box的 `alignment` 属性控制单个子元素在ZStack中的对齐方式
- **层级顺序**：先定义的元素在上层，后定义的元素在下层（类似Photoshop图层）
- **尺寸控制**：建议明确设置width和height，因为层叠元素不会自动调整容器大小

---

## 6️⃣ CSS 映射关系

### 组件与CSS对应

### 智能默认值CSS实现

**Stroke属性智能默认值**映射到CSS的规则：

```typescript
// 输入：只设置 strokeColor="$primary"
<Box strokeColor="$primary" />

// 输出CSS：
border: 1px solid var(--color-primary);
```

```typescript
// 输入：只设置 strokeWeight="2px"
<Box strokeWeight="2px" />

// 输出CSS（$border token存在）：
border: 2px solid var(--color-border);

// 输出CSS（$border token不存在，回退到黑色）：
border: 2px solid #000000;
```

```typescript
// 输入：只设置 strokeStyle="dashed"
<Box strokeStyle="dashed" />

// 输出CSS（$border token存在）：
border: 1px dashed var(--color-border);

// 输出CSS（$border token不存在，回退到黑色）：
border: 1px dashed #000000;
```

#### Box
```typescript
<Box
  width="200px"
  height="100px"
  alignment="center-center"
  distribution="space-between"
  gap="16px"
  padding="20px"
  fill="#ffffff"
  strokeColor="#e0e0e0"
  strokeWeight="1px"
  strokeStyle="solid"
  radius="8px"
  opacity="0.8"
  clipContent="true"
/>
```

**映射CSS：**
```css
.box {
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;  /* 默认 */
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-style: solid;
  border-radius: 8px;
  opacity: 0.8;
  overflow: hidden;
}
```

#### Column
```typescript
<Column
  gap="$md"
  alignment="center-center"
/>
```

**映射CSS：**
```css
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}
```

#### Row
```typescript
<Row
  wrap="true"
  gap="$sm"
  alignment="center-center"
/>
```

**映射CSS：**
```css
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}
```

#### ZStack
```typescript
<ZStack width="200px" height="150px">
  <Box alignment="top-right">上层元素</Box>
  <Box>下层元素</Box>
</ZStack>
```

**映射CSS：**
```css
.zstack {
  position: relative;
  width: 200px;
  height: 150px;
}

.zstack > * {
  position: absolute;
}

/* 第一层（上层）*/
.zstack > *:first-child {
  top: 0;
  right: 0;
  z-index: 3;
}

/* 第二层（下层）*/
.zstack > *:last-child {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
```

### 方向控制映射

#### padding 方向控制
```typescript
padding="x:$lg y:$sm"
padding="top:20px right:10px bottom:20px left:10px"
```

**映射CSS：**
```css
/* x:$lg y:$sm */
padding-x: var(--spacing-lg);
padding-y: var(--spacing-sm);

/* top:20px right:10px bottom:20px left:10px */
padding-top: 20px;
padding-right: 10px;
padding-bottom: 20px;
padding-left: 10px;
```

#### stroke 方向控制
```typescript
strokeColor="top:$primary right:$secondary"
strokeWeight="top:2px right:1px"
strokeStyle="top:solid right:dashed"
```

**映射CSS：**
```css
border-top: 2px solid var(--color-primary);
border-top-style: solid;
border-right: 1px solid var(--color-secondary);
border-right-style: dashed;
border-bottom: none;
border-left: none;
```

#### strokeStyle 映射
```typescript
strokeStyle="solid"      // 实线
strokeStyle="dashed"     // 虚线
strokeStyle="dotted"     // 点线
strokeStyle="double"     // 双线
strokeStyle="groove"     // 凹槽边框
strokeStyle="ridge"      // 脊状边框
strokeStyle="inset"      // 内嵌边框
strokeStyle="outset"     // 外凸边框
```

**映射CSS：**
```css
border-style: solid;     /* 实线 */
border-style: dashed;    /* 虚线 */
border-style: dotted;    /* 点线 */
border-style: double;    /* 双线 */
border-style: groove;    /* 凹槽边框 */
border-style: ridge;     /* 脊状边框 */
border-style: inset;     /* 内嵌边框 */
border-style: outset;    /* 外凸边框 */
```

#### radius 角落控制
```typescript
radius="top-right:$md bottom-left:$lg"
```

**映射CSS：**
```css
border-top-left-radius: 0;
border-top-right-radius: var(--radius-md);
border-bottom-left-radius: var(--radius-lg);
border-bottom-right-radius: 0;
```

---

## 7️⃣ TypeScript 类型定义

### 基础类型
```typescript
// 布局属性
type Alignment =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center-center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

type Distribution = 'pack' | 'center' | 'space' | 'space-between';
type Wrap = 'true' | 'false';
type ClipContent = 'true' | 'false';

// 尺寸属性
type WidthHeight = 'fill' | 'hug' | string;

// Token类型（根据项目配置）
type SpacingToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
type ColorToken = string;
type BorderRadiusToken = 'none' | 'sm' | 'md' | 'lg' | string;

// 边框样式
type StrokeStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | null;

// 智能默认值说明：
// 当任何stroke属性被设置且不为null时，其他缺失的stroke属性将自动补充默认值：
// - strokeColor缺失 → "$border" token → 回退到 "#000000"
// - strokeWeight缺失 → "1px"
// - strokeStyle缺失 → "solid"
// 这是运行时行为，TypeScript接口保持可选属性不变
```

### Box 组件接口
```typescript
interface BoxProps {
  // 布局属性
  width?: WidthHeight;
  height?: WidthHeight;
  alignment?: Alignment;
  distribution?: Distribution;
  gap?: SpacingToken;
  padding?: string;
  clipContent?: ClipContent;

  // 视觉属性
  fill?: ColorToken | null;
  strokeColor?: ColorToken | null;
  strokeWeight?: string | null;
  strokeStyle?: StrokeStyle;
  radius?: BorderRadiusToken | null;
  opacity?: string | null;

  // 其他HTML属性
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Box: React.FC<BoxProps>;
```

### Column 组件接口
```typescript
// Column 继承 Box，无需额外属性
interface ColumnProps extends Omit<BoxProps, 'distribution'> {}

export const Column: React.FC<ColumnProps>;
```

### Row 组件接口
```typescript
interface RowProps extends BoxProps {
  // Row 特有属性
  wrap?: Wrap;
}

export const Row: React.FC<RowProps>;
```

### ZStack 组件接口
```typescript
interface ZStackProps extends Omit<BoxProps, 'gap' | 'distribution'> {
  // ZStack 继承 Box，但不需要 gap 和 distribution
}

export const ZStack: React.FC<ZStackProps>;
```

---

## 8️⃣ 组件选择指南

### 何时使用哪个组件？

#### Box - 通用容器
最通用的视觉容器，用于包裹内容或定义卡片、面板、背景块。支持所有布局和视觉属性。

#### Column - 垂直堆叠
专门用于垂直布局，继承Box的所有属性（除了distribution）。适用于表单、列表、卡片等垂直排列的场景。

#### Row - 水平排列
专门用于水平布局，继承Box的所有属性，并新增`wrap`属性控制换行。适用于按钮组、导航栏、标签云等水平排列的场景。

#### ZStack - 层叠布局
专门用于层叠布局，继承Box的所有属性（除了gap和distribution）。先定义的元素在上层，适用于卡片角标、图片覆盖、加载状态等场景。

### 常见组合模式
组件可以灵活组合使用，构建复杂的UI界面：

- **复杂卡片组件**：使用Column + Row + Box的组合
- **响应式布局**：结合条件渲染实现不同屏幕尺寸的布局
- **导航栏**：Row + Box的组合实现头部导航
- **列表页面**：Column + Row的组合实现搜索结果等列表界面

---

## 9️⃣ 设计哲学总结
