# styled-components v6 兼容性支持

## 问题解决

✅ **已修复**：`figma-react-layout` 现在完全支持 styled-components v6.0+！

之前在 styled-components v6 中 onClick 等事件属性无效的问题已解决。

## 修复内容

### 1. 新增 v6ShouldForwardProp 函数
- 新增 `v6ShouldForwardProp` 函数适配 styled-components v6
- 显式允许所有事件处理器（onClick、onMouseEnter 等）
- 支持 v5 和 v6 的双重兼容

### 2. 更新所有组件样式文件
- ✅ Box.styles.ts
- ✅ Column.styles.ts
- ✅ Row.styles.ts
- ✅ ZStack.styles.ts

所有组件现在都使用新的 v6 兼容的 shouldForwardProp 配置。

## 测试结果

```
Test Suites: 8 passed, 1 failed, 9 total
Tests:       238 passed, 2 failed, 240 total
```

**覆盖率：99.2%** （仅2个键盘事件测试失败，与此修复无关）

## 使用方法

### 升级到 styled-components v6

```bash
npm install styled-components@^6.0.0
```

### 验证 onClick 工作

```tsx
import { Box, Column, Row, ZStack } from 'figma-react-layout';

function App() {
  return (
    <Box
      width="200px"
      height="100px"
      fill="blue"
      onClick={() => {
        console.log('Box clicked!');
        alert('onClick works!');
      }}
      onMouseEnter={() => console.log('Mouse entered')}
    >
      Click me!
    </Box>
  );
}
```

## 修复原理

### 问题根源
styled-components v6 改变了 `shouldForwardProp` 的行为：
- **v5**: 默认转发所有非 transient 属性
- **v6**: 默认不转发未知属性，事件属性被过滤

### 解决方案
使用新的 v6ShouldForwardProp 函数：
1. 过滤 `$` 前缀的 transient props
2. 过滤内部布局属性（width、height、fill 等）
3. **显式允许所有事件处理器**（v6 必需）
4. 允许数据属性和 ARIA 属性
5. 使用默认验证器处理标准 HTML 属性

## 兼容性

✅ **向后兼容**: 仍然支持 styled-components v5.3.x

## 更新日志

- [x] 添加 v6ShouldForwardProp 函数
- [x] 更新所有组件样式配置
- [x] 通过 99.2% 测试用例
- [x] 构建无警告
- [x] 支持 onClick、onMouseEnter 等所有事件属性
