# Layout 组件配置文件

## 简单说明

`src/layout/config.ts` 文件包含了所有 Figma Layout 组件的默认值配置。你可以直接编辑这个文件来调整组件的默认行为。

## 配置文件结构

```typescript
export const LAYOUT_DEFAULTS = {
  // 基础属性 - 所有组件共享
  width: 'hug',
  height: 'hug',
  gap: '0',           // 默认间距
  padding: '0',       // 默认内边距
  overflow: 'hidden', // 默认溢出行为

  // 组件特定默认值
  box: {
    alignment: 'top-left',
  },
  column: {
    alignment: 'top-center',  // 垂直布局：顶部开始，水平居中
    // gap: '$spacing-md',     // 可以覆盖基础值
  },
  row: {
    alignment: 'center-left', // 水平布局：左侧开始，垂直居中
    wrap: 'false',            // 默认不换行
  },
  zstack: {
    alignment: 'center-center', // 层叠布局：完全居中
  },
}
```

## 如何修改默认值

### 1. 直接修改数值

```typescript
// 修改默认间距为 8px
gap: '8px',

// 修改 Column 的默认对齐方式
column: {
  alignment: 'center-center',
}
```

### 2. 使用设计 tokens

```typescript
// 使用设计系统中的 spacing token
gap: '$spacing-md',

// 使用颜色 token
fill: '$color-surface-primary',

// 使用圆角 token
radius: '$radius-md',
```

## 常见配置调整

### 调整布局间距

```typescript
// 全局间距改为 8px
gap: '8px',

// 或者使用 token
gap: '$spacing-sm',
```

### 修改默认对齐方式

```typescript
// Column 改为顶部左对齐
column: {
  alignment: 'top-left',
},

// Row 改为顶部左对齐
row: {
  alignment: 'top-left',
},
```

### 设置 Row 默认换行

```typescript
row: {
  alignment: 'center-left',
  wrap: 'true',  // 默认换行
}
```

### ZStack 默认可见溢出

```typescript
zstack: {
  alignment: 'center-center',
  overflow: 'visible',  // 允许内容溢出显示
}
```

## 注意事项

1. **静态配置**：修改配置文件后需要重新编译才能生效
2. **类型安全**：所有配置值都有 TypeScript 类型检查
3. **向后兼容**：修改配置不会影响现有的组件 API
4. **设计 tokens**：支持 CSS 变量格式的 tokens，如 `$spacing-sm`

## 示例：为不同项目定制配置

### 紧凑型项目

```typescript
export const LAYOUT_DEFAULTS = {
  gap: '4px',        // 较小的间距
  padding: '8px',    // 较小的内边距
  // ... 其他配置
}
```

### 宽松型项目

```typescript
export const LAYOUT_DEFAULTS = {
  gap: '$spacing-lg',     // 使用 token 的大间距
  padding: '$spacing-xl', // 使用 token 的大内边距
  // ... 其他配置
}
```

这就是全部！一个简单的配置文件，让你可以轻松定制组件的默认行为。