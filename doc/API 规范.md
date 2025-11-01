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
| `radius` | `string \| null` | `null` | Corner Radius | `radius="$md"` | 圆角（null表示无圆角） |
| `opacity` | `string \| null` | `null` | Opacity | `opacity="0.8"` | 透明度（null表示无透明度设置） |
| `clipContent` | `'true' \| 'false'` | `'false'` | Clip Content | `clipContent="true"` | 裁剪超出内容（对应Figma Clip Content） |

### 示例

```tsx
// 用户卡片
<Column gap="$md" alignment="center-center" distribution="center" padding="$lg" fill="$surface" radius="$md">
  <Avatar src="user.jpg" size="xl" />
  <Column gap="$xs" alignment="center-center">
    <Text type="title-md">张三</Text>
    <Text type="body-sm" fill="$muted">产品设计师</Text>
  </Column>
  <Button variant="primary">关注</Button>
</Column>

// 垂直列表菜单
<Column gap="0" alignment="top-left" fill="$surface" radius="$md" strokeColor="$divider" strokeWeight="$sm">
  <Box padding="$md" strokeColor="bottom:$divider" strokeWeight="bottom:1px">
    <Row gap="$sm" alignment="center-center" distribution="space-between">
      <Row gap="$sm" alignment="center-center">
        <Icon name="user" />
        <Text>个人信息</Text>
      </Row>
      <Icon name="chevron-right" fill="$muted" />
    </Row>
  </Box>
  <Box padding="$md" strokeColor="bottom:$divider" strokeWeight="bottom:1px">
    <Row gap="$sm" alignment="center-center" distribution="space-between">
      <Row gap="$sm" alignment="center-center">
        <Icon name="settings" />
        <Text>设置</Text>
      </Row>
      <Icon name="chevron-right" fill="$muted" />
    </Row>
  </Box>
  <Box padding="$md">
    <Row gap="$sm" alignment="center-center" distribution="space-between">
      <Row gap="$sm" alignment="center-center">
        <Icon name="logout" fill="$error" />
        <Text fill="$error">退出登录</Text>
      </Row>
      <Icon name="chevron-right" fill="$muted" />
    </Row>
  </Box>
</Column>

// 表单布局
<Column gap="$lg" alignment="top-left" padding="$lg" fill="$surface" radius="$md">
  <Text type="title-md">注册表单</Text>
  <Column gap="$md">
    <Column gap="$xs">
      <Text type="label-sm">邮箱地址</Text>
      <Box padding="$sm" strokeColor="$border" strokeWeight="$sm" radius="$sm">
        <Text type="body-sm" fill="$muted">请输入邮箱</Text>
      </Box>
    </Column>
    <Column gap="$xs">
      <Text type="label-sm">密码</Text>
      <Box padding="$sm" strokeColor="$border" strokeWeight="$sm" radius="$sm">
        <Text type="body-sm" fill="$muted">请输入密码</Text>
      </Box>
    </Column>
  </Column>
  <Column gap="$md">
    <Button variant="primary" width="fill">注册</Button>
    <Box alignment="center-center">
      <Text type="body-sm" fill="$muted">已有账号？<Text fill="$primary">立即登录</Text></Text>
    </Box>
  </Column>
</Column>

// 侧边栏导航
<Column gap="$xs" alignment="top-left" width="200px" padding="$md" fill="$surface">
  <Text type="title-sm" fill="$muted">导航菜单</Text>
  <Column gap="$xs">
    <Box padding="y:$sm" alignment="center-left">
      <Row gap="$sm" alignment="center-center">
        <Icon name="home" />
        <Text>首页</Text>
      </Row>
    </Box>
    <Box padding="y:$sm" fill="$primary" alignment="center-left" radius="$sm">
      <Row gap="$sm" alignment="center-center">
        <Icon name="dashboard" />
        <Text color="white">仪表板</Text>
      </Row>
    </Box>
    <Box padding="y:$sm" alignment="center-left">
      <Row gap="$sm" alignment="center-center">
        <Icon name="profile" />
        <Text>个人资料</Text>
      </Row>
    </Box>
  </Column>
</Column>

// 统计卡片
<Column gap="$md" padding="$lg" fill="$surface" radius="$md" strokeColor="$border" strokeWeight="$sm">
  <Text type="body-sm" fill="$muted">月度收入</Text>
  <Column gap="$xs" alignment="top-left">
    <Text type="title-lg" fill="$success">+12.5%</Text>
    <Text type="title-md">¥128,430</Text>
  </Column>
  <Box fill="$success" padding="x:$sm y:$xs" radius="$sm" alignment="top-left">
    <Text type="body-xs" color="white">较上月增长</Text>
  </Box>
</Column>
```

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
| `radius` | `string \| null` | `null` | Corner Radius | `radius="$md"` | 圆角（null表示无圆角） |
| `opacity` | `string \| null` | `null` | Opacity | `opacity="0.8"` | 透明度（null表示无透明度设置） |
| `clipContent` | `'true' \| 'false'` | `'false'` | Clip Content | `clipContent="true"` | 裁剪超出内容（对应Figma Clip Content） |

### 示例

```tsx
// 设置项 - 两端对齐
<Row gap="$sm" alignment="center-center" distribution="space-between">
  <Text type="label-sm">设置</Text>
  <Switch />
</Row>

// 按钮组
<Row gap="$xs" alignment="center-center">
  <Button variant="secondary">取消</Button>
  <Button variant="primary">确定</Button>
</Row>

// 用户信息行
<Row gap="$md" alignment="center-center" padding="$lg" fill="$surface" radius="$md">
  <Avatar src="user.jpg" size="md" />
  <Column gap="$xs">
    <Text type="title-sm">用户名</Text>
    <Text type="body-xs">user@example.com</Text>
  </Column>
  <Button variant="ghost" size="sm">
    <Icon name="more" />
  </Button>
</Row>

// 标签云 - 换行布局
<Row wrap="true" gap="$md" alignment="top-left">
  {tags.map(tag => (
    <Box key={tag} padding="x:$sm y:$xs" radius="$full" fill="$primary">
      <Text color="white">{tag}</Text>
    </Box>
  ))}
</Row>

// 搜索栏
<Row gap="$sm" alignment="center-center" padding="x:$md y:$sm" fill="$surface" radius="$md" strokeColor="$divider" strokeWeight="$sm">
  <Icon name="search" fill="$muted" />
  <Box fill="transparent" width="100%">
    <Text type="body-sm" fill="$muted">搜索...</Text>
  </Box>
  <Button variant="ghost" size="sm">
    <Icon name="filter" />
  </Button>
</Row>

// 卡片操作栏
<Row gap="$md" alignment="center-between" padding="$lg" fill="$surface" strokeColor="bottom:$divider" strokeWeight="bottom:1px">
  <Column gap="$xs">
    <Text type="title-md">卡片标题</Text>
    <Text type="body-sm">副标题描述</Text>
  </Column>
  <Row gap="$sm">
    <Button variant="ghost" size="sm">
      <Icon name="like" />
    </Button>
    <Button variant="ghost" size="sm">
      <Icon name="share" />
    </Button>
    <Button variant="ghost" size="sm">
      <Icon name="bookmark" />
    </Button>
  </Row>
</Row>
```

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
| `radius` | `string \| null` | `null` | Corner Radius | `radius="$md"` | 圆角（null表示无圆角） |
| `opacity` | `string \| null` | `null` | Opacity | `opacity="0.8"` | 透明度（null表示无透明度设置） |
| `clipContent` | `'true' \| 'false'` | `'false'` | Clip Content | `clipContent="true"` | 裁剪超出内容（对应Figma Clip Content） |

**使用说明**：
- **子元素定位**：通过Box的 `alignment` 属性控制单个子元素在ZStack中的对齐方式
- **层级顺序**：先定义的元素在上层，后定义的元素在下层（类似Photoshop图层）
- **尺寸控制**：建议明确设置width和height，因为层叠元素不会自动调整容器大小

### 示例

```tsx
// 卡片角标
<ZStack width="200px" height="150px" alignment="top-right">
  {/* 角标在最上层 */}
  <Box alignment="top-right" fill="$error" radius="full" width="20px" height="20px">
    <Text color="white" alignment="center-center">3</Text>
  </Box>

  {/* 卡片背景在最下层 */}
  <Box fill="$surface" padding="$lg" radius="$md" strokeColor="$divider" strokeWeight="$sm">
    <Text type="title-sm">卡片内容</Text>
    <Text>这是卡片的描述文本</Text>
  </Box>
</ZStack>

// 图片覆盖标题
<ZStack width="300px" height="200px" alignment="bottom-center">
  {/* 文字覆盖层在上层 */}
  <Box fill="rgba(0,0,0,0.7)" padding="x:$lg y:$md" radius="bottom-$md" width="100%">
    <Text color="white" alignment="center-center">图片标题</Text>
  </Box>

  {/* 背景图片在下层 */}
  <Image src="banner.jpg" radius="$md" />
</ZStack>

// 加载状态
<ZStack width="100%" height="200px" alignment="center-center">
  {/* 加载文字在上层 */}
  <Box alignment="bottom-center" padding="$sm">
    <Text type="body-sm">加载中...</Text>
  </Box>

  {/* Spinner 在中间层 */}
  <Spinner />

  {/* 背景层在最下层 */}
  <Box fill="$surface" />
</ZStack>

// 用户头像+在线状态
<ZStack width="60px" height="60px" alignment="bottom-right">
  {/* 在线状态指示器在上层 */}
  <Box alignment="bottom-right" fill="$success" radius="full" width="16px" height="16px" strokeColor="white" strokeWeight="2px" />

  {/* 头像背景在下层 */}
  <Avatar src="user.jpg" size="lg" />
</ZStack>

// 层级说明示例
<ZStack width="200px" height="120px">
  {/* 第1层：最上层 */}
  <Box alignment="top-left" fill="$error" width="40px" height="40px">
    <Text color="white" alignment="center-center">1</Text>
  </Box>

  {/* 第2层：中间层 */}
  <Box alignment="center-center" fill="$warning" width="80px" height="80px">
    <Text color="white" alignment="center-center">2</Text>
  </Box>

  {/* 第3层：最下层 */}
  <Box fill="$primary" width="120px" height="120px">
    <Text color="white" alignment="center-center">3</Text>
  </Box>
</ZStack>
```
---

## 6️⃣ CSS 映射关系

### 组件与CSS对应

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
```

**映射CSS：**
```css
border-top: 2px solid var(--color-primary);
border-right: 1px solid var(--color-secondary);
border-bottom: none;
border-left: none;
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
```typescript
// ✅ 适合场景：
<Box fill="$surface" padding="$lg" radius="$md">
  <Text>卡片内容</Text>
</Box>

// ✅ 单个元素的包装
<Box padding="$sm" strokeColor="$border" strokeWeight="$sm" radius="$sm">
  <Input placeholder="输入内容" />
</Box>
```

#### Column - 垂直堆叠
```typescript
// ✅ 表单布局
<Column gap="$md">
  <Input label="邮箱" />
  <Input label="密码" />
  <Button>提交</Button>
</Column>

// ✅ 用户信息卡片
<Column alignment="center-center" gap="$sm">
  <Avatar />
  <Text>用户名</Text>
  <Button>关注</Button>
</Column>
```

#### Row - 水平排列
```typescript
// ✅ 设置项
<Row distribution="space-between" alignment="center-center">
  <Text>通知</Text>
  <Switch />
</Row>

// ✅ 按钮组
<Row gap="$xs" alignment="center-center">
  <Button variant="secondary">取消</Button>
  <Button variant="primary">确定</Button>
</Row>

// ✅ 标签云
<Row wrap="true" gap="$md">
  {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
</Row>
```

#### ZStack - 层叠布局
```typescript
// ✅ 卡片角标
<ZStack width="200px" height="150px">
  <Box alignment="top-right" fill="$error" radius="full" width="20px" height="20px">
    <Text color="white">3</Text>
  </Box>
  <Box fill="$surface" padding="$md" radius="$md">
    <Text>卡片内容</Text>
  </Box>
</ZStack>

// ✅ 图片叠加文字
<ZStack alignment="bottom-center">
  <Box fill="rgba(0,0,0,0.7)" padding="$sm">
    <Text color="white">图片标题</Text>
  </Box>
  <Image src="banner.jpg" radius="$md" />
</ZStack>
```

### 常见组合模式

#### 复杂卡片组件
```typescript
<Card>
  <Column gap="$md">
    <Row distribution="space-between">
      <Text type="title-md">卡片标题</Text>
      <Icon name="more" />
    </Row>
    <Text>卡片描述内容</Text>
    <Row distribution="space-between" alignment="center-center">
      <Text type="body-sm">更新时间</Text>
      <Button variant="primary">操作</Button>
    </Row>
  </Column>
</Card>
```

#### 响应式布局
```typescript
<Column gap="$lg">
  {/* 桌面端水平排列，移动端垂直排列 */}
  <Row className="md:hidden" gap="$md">
    <StatCard />
    <StatCard />
  </Row>
  <Column className="hidden md:block" gap="$md">
    <StatCard />
    <StatCard />
  </Column>
</Column>
```

---

## 9️⃣ 设计哲学总结
