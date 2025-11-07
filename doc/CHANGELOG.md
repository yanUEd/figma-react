# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-11-05

### Fixed
- **GitHub 链接**: 更新 package.json 中的仓库链接到正确的地址 (https://github.com/yanUEd/figma-react)
- **文档链接**: 修复 homepage 和 issues 链接指向正确的项目地址

## [1.0.2] - 2025-11-05

### Fixed
- **styled-components 警告**: 完全消除所有未知属性警告（`gap`, `padding`, `distribution`, `alignment`, `fill`, `strokeColor`, `strokeWeight`, `strokeStyle`, `radius`, `opacity` 等）
- **Column alignment 映射**: 修复 Column 组件 `alignment="center-left"` 显示为 `center-center` 的问题
- **Column alignment 映射**: 修复所有水平对齐选项（left/center/right）都被硬编码为居中的问题

### Improved
- **Transient Props**: 全面采用 styled-components 推荐的 transient props（$前缀）最佳实践
- **类型安全**: 添加 `$` 前缀版本的 Transient Props 类型定义
- **一致性**: 所有组件（Box, Row, Column, ZStack）现在使用相同的实现模式
- **shouldForwardProp**: 改进全局配置，提供双重保护机制确保自定义属性不传递到DOM

### Technical Details
- **修改文件**: 10个核心文件 + 1个修复文档
- **向后兼容**: 100% 保持现有API使用方式
- **构建验证**: 通过 TypeScript 类型检查和构建测试

### Breaking Changes
- 无 - 所有修改都保持完全向后兼容

## [1.0.1] - 2025-11-04

### Fixed
- 移除控制台调试信息
- 优化构建配置

## [1.0.0] - 2025-11-04

### Added
- 🎉 初始发布 figma-react-layout
- 核心布局组件：Box, Row, Column, ZStack
- 完整的 Figma Auto Layout 功能支持
- TypeScript 类型定义
- styled-components 集成
- 响应式设计支持
- 完整的文档和示例

### Features
- **智能布局**: 基于 Figma Auto Layout 理念的布局系统
- **灵活对齐**: 支持 9 种对齐方式（top-left, center-center, bottom-right 等）
- **间距控制**: 统一的间距系统（xs, sm, md, lg, xl）
- **尺寸模式**: 支持 fill, hug 和自定义尺寸
- **视觉属性**: 完整的背景、边框、圆角、透明度支持
- **开发者友好**: 完整的 TypeScript 支持和 IntelliSense

---

## 版本说明

- **主版本号**: 不兼容的 API 修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正