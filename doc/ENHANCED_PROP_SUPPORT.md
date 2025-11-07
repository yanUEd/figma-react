# 🎉 figma-react-layout 重大升级：完整的 React 属性支持

## 回答用户问题

### Q: React 有不是以 'on' 开头的事件属性吗？

**A: React 中确实有一些重要的非 'on' 开头属性：**

1. **基础 HTML 属性**：`id`, `className`, `style`, `title`, `hidden`, `draggable`, `tabIndex`
2. **可访问性属性**：`role`, `aria-*` 系列（如 `aria-label`, `aria-expanded`）
3. **自定义数据属性**：`data-*` 系列（如 `data-testid`, `data-user-id`）
4. **React 特殊属性**：`key`, `ref`, `children`, `dangerouslySetInnerHTML`
5. **表单相关属性**：`name`, `value`, `checked`, `disabled`, `required`
6. **媒体属性**：`src`, `alt`, `poster`, `controls`, `loop`

### Q: 有没有更好的办法支持，保持扩展性？

**A: 我们实施了基于智能过滤的解决方案：**

## 🚀 实施的解决方案

### 1. 智能属性过滤系统
```typescript
// 新的智能过滤机制
const smartShouldForwardProp = (prop: string): boolean => {
  // 1. 过滤 transient props ($ 前缀)
  if (prop.startsWith('$')) return false;

  // 2. 过滤内部布局属性
  if (isInternalLayoutProp(prop)) return false;

  // 3. 自动允许所有事件处理器
  if (isEventProp(prop)) return true;

  // 4. 自动允许数据属性
  if (isDataProp(prop)) return true;

  // 5. 自动允许 ARIA 属性
  if (isAriaProp(prop)) return true;

  // 6. 允许 React 标准属性
  if (isReactStandardProp(prop)) return true;

  // 7. 保守策略：未知属性默认允许
  return true;
};
```

### 2. 组件特定的属性过滤
- **Box**: 过滤 `distribution` 属性
- **Column**: 基础过滤
- **Row**: 过滤 `distribution`, `wrap` 属性
- **ZStack**: 过滤 `gap`, `distribution` 属性

### 3. 类型安全的属性支持
```typescript
export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  // 布局属性...
}
```

## 📊 支持的属性范围

### ✅ 完全支持的属性类别：
- 🖱️ **所有 React 事件属性**（onClick, onKeyDown, onTouchStart 等）
- 🏷️ **基础 HTML 属性**（id, className, style, title 等）
- ♿ **可访问性属性**（role, aria-label, aria-expanded 等）
- 📊 **自定义数据属性**（data-testid, data-user-id 等）
- 🔧 **React 特殊属性**（key, ref, dangerouslySetInnerHTML 等）
- 📝 **表单属性**（name, value, checked, disabled 等）
- 🎬 **媒体属性**（src, alt, controls, loop 等）

### 🎯 核心优势：
1. **向前兼容** - 自动支持 React 新版本的属性
2. **扩展性强** - 保守策略，未知属性默认允许
3. **类型安全** - 基于 React.HTMLAttributes 的完整类型支持
4. **性能优化** - 智能属性分类，减少不必要的过滤
5. **组件定制** - 每个组件可以有专门的属性过滤策略

## 🔧 技术实现细节

### 文件结构：
```
src/
├── utils/
│   └── propFilter.ts          # 智能属性过滤工具
├── index.ts                   # 全局属性过滤配置
└── layout/components/
    ├── Box/Box.styles.ts      # Box 组件特定过滤
    ├── Column/Column.styles.ts # Column 组件特定过滤
    ├── Row/Row.styles.ts      # Row 组件特定过滤
    └── ZStack/ZStack.styles.ts # ZStack 组件特定过滤
```

### 属性分类逻辑：
1. **Transient Props** (`$` 前缀) → 过滤掉
2. **内部布局属性** → 过滤掉
3. **事件属性** (`on*`) → 允许
4. **数据属性** (`data-*`) → 允许
5. **ARIA 属性** (`aria-*`) → 允许
6. **React 标准属性** → 允许
7. **未知属性** → 默认允许（保守策略）

## 📈 从前到后的对比

### 之前的实现：
```typescript
// 简单的字符串检查
if (prop.startsWith('on') && prop.length > 2 && prop[2] === prop[2].toUpperCase()) {
  return true; // 只支持事件属性
}
```

### 现在的实现：
```typescript
// 智能的属性分类系统
const REACT_STANDARD_PROPS = new Set([...]); // 完整的属性白名单
const INTERNAL_LAYOUT_PROPS = new Set([...]); // 内部属性黑名单

// 自动识别各种类型的属性
if (isEventProp(prop)) return true;
if (isDataProp(prop)) return true;
if (isAriaProp(prop)) return true;
if (isReactStandardProp(prop)) return true;
```

## 🎉 实际效果

### 之前：
- ❌ 只支持有限的几个 HTML 属性
- ❌ 只支持以 'on' 开头的事件属性
- ❌ 需要手动维护属性列表
- ❌ 无法支持新 React 版本的属性

### 现在：
- ✅ 支持完整的 React 属性生态系统
- ✅ 自动支持所有标准 React 属性
- ✅ 智能属性分类，自动适应
- ✅ 向前兼容，支持未来属性
- ✅ 组件级别的定制化
- ✅ 完整的 TypeScript 类型支持

## 📝 使用示例

现在可以像使用普通 React 组件一样使用布局组件：

```tsx
<Box
  // 布局属性
  width="300px" height="150px" fill="#e3f2fd"

  // 完整的 React 属性支持
  id="my-box" className="interactive" role="button"
  aria-label="交互式组件" data-testid="test-box"
  onClick={handleClick} onKeyDown={handleKeyDown}
  onMouseEnter={handleMouseEnter} onFocus={handleFocus}
  draggable tabIndex={0}
>
  内容
</Box>
```

## 🏆 总结

这次升级将 figma-react-layout 从一个**纯布局工具**进化为一个**功能完整的 React 组件库**，解决了：

1. **React 非事件属性支持问题** - 现在支持所有 React 标准属性
2. **扩展性问题** - 智能属性过滤，自动适应新属性
3. **类型安全问题** - 基于 React.HTMLAttributes 的完整类型支持
4. **维护成本问题** - 自动化属性识别，减少手动维护

**figma-react-layout 现在是一个真正的 React 组件库！** 🚀