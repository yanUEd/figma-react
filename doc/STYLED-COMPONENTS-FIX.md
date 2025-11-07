# styled-components 未知属性警告修复

## 问题描述

使用 figma-react-layout 包时，控制台会出现以下警告：

```
styled-components: it looks like an unknown prop "gap" is being sent through to the DOM, which will likely trigger a React console error.
```

类似的警告还包括：`padding`, `distribution`, `alignment` 等自定义布局属性。

## 修复方案

采用 **Transient Props ($前缀)** 方案，这是 styled-components 推荐的最佳实践。

### 修复内容

#### 1. 类型定义更新 (`src/layout/types/index.ts`)
- 添加了 `$` 前缀版本的 Transient Props 接口
- 为每个组件类型添加了对应的 Transient Props 类型
- 保持原有 API 接口不变，确保向后兼容

#### 2. 组件更新
- **Box 组件** (`src/layout/components/Box/Box.tsx`)
- **Row 组件** (`src/layout/components/Row/Row.tsx`)
- **Column 组件** (`src/layout/components/Column/Column.tsx`)
- **ZStack 组件** (`src/layout/components/ZStack/ZStack.tsx`)

每个组件现在：
1. 接收标准的 props 接口（保持 API 兼容性）
2. 将 props 转换为 `$` 前缀的 transient props
3. 只传递 transient props 给 styled 组件

#### 3. 样式组件更新
- **Box 样式** (`src/layout/components/Box/Box.styles.ts`)
- **Row 样式** (`src/layout/components/Row/Row.styles.ts`)
- **Column 样式** (`src/layout/components/Column/Column.styles.ts`)
- **ZStack 样式** (`src/layout/components/ZStack/ZStack.styles.ts`)

每个样式组件现在：
1. 使用 `withConfig({ shouldForwardProp: prop => !prop.startsWith('$') })`
2. 接收 Transient Props 类型
3. 将 `$` 前缀 props 转换回标准 props 供 CSS 生成器使用

#### 4. shouldForwardProp 配置改进 (`src/index.ts`)
- 增加了对 `$` 前缀 transient props 的过滤
- 保持对旧版本 props 的过滤（向后兼容）
- 简化了过滤逻辑

## 修复效果

### ✅ 解决的问题
- 完全消除了 `gap`, `padding`, `distribution`, `alignment` 等属性的未知属性警告
- 完全消除了 `fill`, `strokeColor`, `strokeWeight`, `strokeStyle`, `radius`, `opacity` 等属性的警告
- 遵循 styled-components 最佳实践
- 不破坏现有 API 使用方式
- 确保所有组件（Box、Row、Column、ZStack）实现一致性

### ✅ 保持的兼容性
- 现有组件使用方式完全不变
- 所有属性接口保持一致
- StyleProvider 配置保持向后兼容

## 使用方式

### 基本使用（无变化）
```tsx
import { Box, Row, Column } from 'figma-react-layout';

// 使用方式完全不变
<Box gap="md" padding="16px" fill="blue">
  <Row distribution="space-between" alignment="center">
    <Column gap="sm">内容</Column>
  </Row>
</Box>
```

### StyleProvider 配置（可选但推荐）
```tsx
import { StyleProvider } from 'figma-react-layout';

function App() {
  return (
    <StyleProvider>
      {/* 你的应用 */}
    </StyleProvider>
  );
}
```

## 技术细节

### Transient Props 工作原理
1. 组件接收标准 props（如 `gap`, `padding`）
2. 内部转换为 `$gap`, `$padding` 等 transient props
3. styled-components 自动过滤 `$` 前缀的 props，不传递到 DOM
4. 样式函数中接收 transient props 并转换为标准 props 供 CSS 生成器使用

### 双重保护机制
1. **组件层面**: 转换为 transient props
2. **样式层面**: `shouldForwardProp` 配置过滤 `$` 前缀
3. **全局层面**: StyleProvider 的 shouldForwardProp 配置

这种多层保护确保即使有遗漏，自定义属性也不会传递到 DOM。

## 验证

项目已通过以下验证：
- ✅ TypeScript 类型检查通过
- ✅ 构建成功（`npm run build`）
- ✅ 所有可能的警告属性都被正确过滤
- ✅ API 使用方式保持不变

## 📋 修改的文件

### 核心修复
- `src/layout/types/index.ts` - 添加 transient props 类型定义
- `src/index.ts` - 改进 shouldForwardProp 配置

### 组件文件
- `src/layout/components/Box/Box.tsx` - 使用 transient props
- `src/layout/components/Row/Row.tsx` - 使用 transient props
- `src/layout/components/Column/Column.tsx` - 使用 transient props
- `src/layout/components/ZStack/ZStack.tsx` - 使用 transient props

### 样式文件
- `src/layout/components/Box/Box.styles.ts` - 更新样式组件
- `src/layout/components/Row/Row.styles.ts` - 更新样式组件
- `src/layout/components/Column/Column.styles.ts` - 更新样式组件
- `src/layout/components/ZStack/ZStack.styles.ts` - 更新样式组件

---

**修复完成时间**: 2025-11-05
**修复方案**: Transient Props ($前缀) + shouldForwardProp 配置
**兼容性**: 100% 向后兼容
**修复组件**: Box、Row、Column、ZStack（全部组件）