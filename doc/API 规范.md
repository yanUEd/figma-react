我们先来定义这套系统的核心基础层 —— **Layout 原子组件 API 规范**。
目标是：
> 复刻 Figma Auto Layout 的使用体验，在 React 中实现等价的布局与视觉控制能力。

---

# 🧱 Design-Aligned Layout API 规范（v0.1）

## 概览

本规范定义了四个基础组件：
`<Box>`、`<Stack>`、`<Row>`、`<Grid>`

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
| `clipContent` | `'true' \| 'false'` | `'false'` | Clip Content | `clipContent="true"` | 裁剪超出内容（对应Figma Clip Content） |
| **视觉属性** |||||||
| `fill` | `string \| null` | `null` | Fill | `fill="$surface"` | 填充色（null表示无背景色） |
| `strokeColor` | `string \| null` | `null` | Stroke Color | `strokeColor="$primary"` | 边框颜色（支持方向控制） |
| `strokeWeight` | `string \| null` | `null` | Stroke Weight | `strokeWeight="$md"` | 边框粗细（支持方向控制） |
| `radius` | `string \| null` | `null` | Corner Radius | `radius="$md"` | 圆角（null表示无圆角） |
| `opacity` | `string \| null` | `null` | Opacity | `opacity="0.8"` | 透明度（null表示无透明度设置） |

### 方向控制语法

支持属性：`padding`, `strokeColor`, `strokeWeight`, `radius`

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

### 示例

```tsx
// ===== 核心场景示例 =====

// 1. 基础卡片 - 最常用场景
<Box
  fill="$surface"
  padding="$lg"
  radius="$md"
  strokeColor="$divider"
  strokeWeight="$sm"
  alignment="center-center"
  distribution="space-between"
  gap="$md"
>
  <Text type="title-md">标题</Text>
  <Button variant="primary">操作</Button>
</Box>

// 2. 纯布局容器 - 无装饰效果
<Box
  padding="$md"
  gap="$sm"
>
  <Text>仅用于布局，无任何装饰效果</Text>
  <Button>按钮</Button>
</Box>

// 3. 用户信息卡 - 典型UI组件
<Box
  fill="$surface"
  padding="$lg"
  radius="$md"
  gap="$md"
  alignment="center-center"
>
  <Avatar size="lg" />
  <Box distribution="center">
    <Text type="title-md">用户名</Text>
    <Text type="body-sm">用户描述</Text>
  </Box>
</Box>

// 4. 图片容器 - 裁剪控制
<Box
  width="200px"
  height="150px"
  radius="$md"
  clipContent="true"
  overflow="hidden"
>
  <Image src="large-image.jpg" width="100%" height="100%" />
</Box>

// ===== 布局控制示例 =====

// 5. 垂直居中布局
<Box
  width="fill"
  height="200px"
  alignment="center-center"
  distribution="center"
  gap="$sm"
>
  <Icon />
  <Text>居中对齐的内容</Text>
</Box>

// 6. 两端对齐布局 - 设置项
<Box
  padding="y:$md"
  strokeColor="bottom:$divider"
  strokeWeight="bottom:1px"
  alignment="center-center"
  distribution="space-between"
>
  <Text>设置选项</Text>
  <Switch />
</Box>

// 7. 响应式网格容器
<Box
  width="fill"
  padding="$lg"
  gap="$md"
  alignment="top-center"
>
  {features.map(feature => (
    <Box key={feature.id} width="300px" fill="$surface" padding="$md" radius="$md">
      <Icon name={feature.icon} />
      <Text type="title-sm">{feature.title}</Text>
      <Text>{feature.description}</Text>
    </Box>
  ))}
</Box>

// ===== 样式控制示例 =====

// 8. 方向内边距控制
<Box
  padding="x:$lg y:$sm"        // 水平大间距，垂直小间距
  gap="$sm"
>
  <Text>左右边距大，上下边距小</Text>
</Box>

// 9. 单边边框效果
<Box
  padding="$md"
  strokeColor="bottom:$primary"
  strokeWeight="bottom:2px"
>
  <Text>只有底边框的容器</Text>
</Box>

// 10. 混合样式 - Token + 自定义值
<Box
  fill="#f5f5f5"              // 自定义背景色
  radius="$md"                // Token圆角
  padding="$lg 20px"          // 混合内边距
  gap="$sm"
>
  <Text>Token和自定义值混合使用</Text>
</Box>

// ===== 高级特性示例 =====

// 11. 复杂样式控制 - 边框与角落圆角组合
<Box
  padding="$md"
  strokeColor="top:$border right:$primary bottom:$border left:$border"
  strokeWeight="top:1px right:3px bottom:1px left:1px"
  radius="top-right:$md bottom-left:$md"  // 角落圆角：仅右上角和左下角
>
  <Text>边框与角落圆角的复杂组合效果</Text>
</Box>

// 12. 实际项目 - 卡片列表
<Box
  fill="$surface"
  padding="x:$lg y:$md"
  radius="$md"
  gap="$sm"
>
  {items.map(item => (
    <Box
      key={item.id}
      padding="y:$sm"
      strokeColor={item !== last ? "bottom:$divider" : null}
      strokeWeight="bottom:1px"
      alignment="center-center"
      distribution="space-between"
    >
      <Box>
        <Text type="title-sm">{item.title}</Text>
        <Text type="body-xs">{item.subtitle}</Text>
      </Box>
      <Button variant="ghost" size="sm">
        <Icon name="chevron-right" />
      </Button>
    </Box>
  ))}
</Box>
```

---

## 2️⃣ `<Stack>` — 垂直布局容器

Figma 对应：**Auto Layout (Vertical)**

### 用途

将多个子元素垂直堆叠，自动管理间距与对齐。

### Props

继承 `<Box>` 的全部属性，新增以下：

| 属性          | 类型                  | 对应 Figma              | 示例        | 说明      |
| ----------- | ------------------- | --------------------- | --------- | ------- |
| `direction` | `'vertical'` *(默认)* | Auto Layout Direction | -         | 固定为垂直方向 |
| `reverse`   | `boolean`           | -                     | `reverse` | 反转排列顺序  |

### 示例

```tsx
<Stack gap="md" align="center">
  <Avatar size="lg" />
  <Text type="title-md">用户昵称</Text>
  <Button variant="secondary">关注</Button>
</Stack>
```

---

## 3️⃣ `<Row>` — 水平布局容器

Figma 对应：**Auto Layout (Horizontal)**

### 用途

让元素在水平方向排列。

### Props

继承 `<Box>` 的全部属性，新增以下：

| 属性          | 类型                    | 对应 Figma              | 示例        | 说明      |
| ----------- | --------------------- | --------------------- | --------- | ------- |
| `direction` | `'horizontal'` *(默认)* | Auto Layout Direction | -         | 固定为水平方向 |
| `reverse`   | `boolean`             | -                     | `reverse` | 反转排列顺序  |
| `wrap`      | `boolean`             | -                     | `wrap`    | 是否自动换行  |

### 示例

```tsx
<Row gap="sm" justify="space-between" align="center">
  <Text type="label-sm">设置</Text>
  <Switch />
</Row>
```

---

## 4️⃣ `<Grid>` — 网格布局容器

Figma 对应：**Grid / Repeater Frame**

### 用途

用于均匀分布内容区域，例如卡片、列表项、图文块。

### Props

| 属性             | 类型                                                | 对应 Figma | 示例                     | 说明                       |
| -------------- | ------------------------------------------------- | -------- | ---------------------- | ------------------------ |
| `columns`      | `number \| 'auto'`                                | Columns  | `columns={3}`          | 列数                       |
| `gap`          | `Token`                                           | Gutter   | `gap="md"`             | 单元格间距                    |
| `align`        | `'start' \| 'center' \| 'end'`                    | -        | -                      | 垂直对齐                     |
| `justify`      | `'start' \| 'center' \| 'end' \| 'space-between'` | -        | -                      | 水平对齐                     |
| `itemMinWidth` | `string`                                          | -        | `itemMinWidth="120px"` | 自适应最小列宽（responsive grid） |

### 示例

```tsx
<Grid columns={2} gap="md" itemMinWidth="160px">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</Grid>
```

---

## 5️⃣ Tokens 一致性

所有尺寸类属性均应与 Figma Tokens Studio 的语义变量保持一致：

```json
{
  "spacing": { "xs": 4, "sm": 8, "md": 16, "lg": 24, "xl": 32 },
  "radius": { "none": 0, "sm": 4, "md": 8, "lg": 16 },
  "color": { "surface": "#fff", "primary": "#1a73e8" },
  "shadow": { "1": "0 1px 2px rgba(0,0,0,0.08)" }
}
```

> 通过构建工具（如 Style Dictionary 或 Tokens Studio Sync）自动生成到 CSS 变量。

---

## 6️⃣ 设计哲学总结

| 原则             | 含义                            |
| -------------- | ----------------------------- |
| 🎯 **语义一致性**   | 与 Figma 属性命名保持完全一致            |
| ⚙️ **参数化控制**   | 所有视觉微调通过 props 完成             |
| 🧩 **组合优先**    | 上层组件由 Box/Stack/Row/… 组合构建    |
| 🧠 **AI 可解释性** | 属性名天然可被 AI 理解并生成              |
| 📱 **移动端友好**   | 默认采用 flex + responsive tokens |

---

是否希望我下一步帮你写出：

* 一份 **`<Box>` 组件的 TypeScript 接口定义 + Tailwind 实现示例**
  还是
* 一份 **「属性映射表」标准文档（Figma 属性 → React Props 对照表）**？
