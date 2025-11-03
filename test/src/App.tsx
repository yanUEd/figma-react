import { Box, Column, Row, ZStack, LAYOUT_DEFAULTS } from '@figma-react/layout'

function App() {

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '32px', color: '#333', textAlign: 'center' }}>
        Figma Layout 组件默认值测试
      </h1>

      {/* 配置展示面板 */}
      <div style={{ marginBottom: '32px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ color: '#495057', marginBottom: '12px' }}>当前配置文件默认值</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px' }}>
          <div><strong>基础间距:</strong> {LAYOUT_DEFAULTS.gap}</div>
          <div><strong>基础内边距:</strong> {LAYOUT_DEFAULTS.padding}</div>
          <div><strong>Box对齐:</strong> {LAYOUT_DEFAULTS.box.alignment}</div>
          <div><strong>Column对齐:</strong> {LAYOUT_DEFAULTS.column.alignment}</div>
          <div><strong>Row对齐:</strong> {LAYOUT_DEFAULTS.row.alignment}</div>
          <div><strong>Row换行:</strong> {LAYOUT_DEFAULTS.row.wrap}</div>
          <div><strong>ZStack对齐:</strong> {LAYOUT_DEFAULTS.zstack.alignment}</div>
          <div><strong>ZStack溢出:</strong> {LAYOUT_DEFAULTS.zstack.overflow || LAYOUT_DEFAULTS.overflow}</div>
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ color: '#495057', marginBottom: '16px' }}>Column 组件 - 默认 top-center</h2>
        <Column
          width="300px"
          height="200px"
          fill="#f0f8ff"
          padding="16px"
          // 不设置gap，使用配置文件中的默认值
          strokeColor="#007bff"
          strokeWeight="2px"
          radius="8px"
        >
          <Box height="40px" fill="#007bff" radius="4px" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            项目 1 (水平居中)
          </Box>
          <Box height="40px" fill="#0056b3" radius="4px" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            项目 2 (水平居中)
          </Box>
        </Column>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
          效果：垂直从顶部开始，每个Box水平居中
        </p>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ color: '#495057', marginBottom: '16px' }}>Row 组件 - 默认 center-left</h2>
        <Row
          width="500px"
          height="120px"
          fill="#f8fff0"
          padding="16px"
          // 不设置gap，使用配置文件中的默认值
          strokeColor="#28a745"
          strokeWeight="2px"
          radius="8px"
        >
          <Box width="80px" height="60px" fill="#28a745" radius="4px" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            左侧
          </Box>
          <Box width="80px" height="60px" fill="#1e7e34" radius="4px" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            中间
          </Box>
          <Box width="80px" height="60px" fill="#155724" radius="4px" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            右侧
          </Box>
        </Row>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
          效果：水平从左侧开始，所有Box垂直居中
        </p>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ color: '#495057', marginBottom: '16px' }}>ZStack 组件 - 默认 center-center</h2>
        <ZStack
          width="200px"
          height="150px"
          fill="#fff5f5"
          strokeColor="#dc3545"
          strokeWeight="2px"
          radius="8px"
        >
          <Box
            width="60%"
            height="60%"
            fill="#dc3545"
            radius="4px"
            style={{
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            顶层
          </Box>
          <Box
            width="100%"
            height="100%"
            fill="#f8d7da"
            radius="6px"
          />
        </ZStack>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
          效果：顶层Box完全居中在底层背景之上
        </p>
      </div>

      <div style={{ padding: '20px', background: '#e9ecef', borderRadius: '8px' }}>
        <h3 style={{ color: '#495057', marginBottom: '12px' }}>配置文件说明：</h3>

        <h4 style={{ color: '#495057', marginTop: '16px', marginBottom: '8px' }}>📋 当前默认值：</h4>
        <ul>
          <li><strong>Column</strong>: top-center (顶部开始 + 水平居中)</li>
          <li><strong>Row</strong>: center-left (垂直居中 + 左侧开始)</li>
          <li><strong>ZStack</strong>: center-center (完全居中)</li>
          <li><strong>基础间距</strong>: 0 (可在配置文件中修改)</li>
        </ul>

        <h4 style={{ color: '#495057', marginTop: '16px', marginBottom: '8px' }}>⚙️ 配置文件特性：</h4>
        <ul>
          <li><strong>静态配置</strong>: 所有默认值在 `src/layout/config.ts` 文件中</li>
          <li><strong>手动修改</strong>: 直接编辑配置文件来调整默认值</li>
          <li><strong>设计 tokens</strong>: 支持 '$spacing-sm'、'$color-primary' 等 token 格式</li>
          <li><strong>类型安全</strong>: 完整的 TypeScript 类型支持</li>
          <li><strong>向后兼容</strong>: 保持现有 API 不变</li>
        </ul>

        <h4 style={{ color: '#495057', marginTop: '16px', marginBottom: '8px' }}>🔧 如何修改默认值：</h4>
        <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '13px' }}>
          <div>// 在 src/layout/config.ts 中修改</div>
          <div>gap: '8px', // 改为 8px 间距</div>
          <div>gap: '$spacing-md', // 或使用设计 token</div>
        </div>

        <div style={{ marginTop: '16px', padding: '12px', background: '#d4edda', borderRadius: '4px', border: '1px solid #c3e6cb' }}>
          <p style={{ color: '#155724', margin: 0, fontWeight: 'bold' }}>
            ✅ 简单的配置文件让默认值管理变得直观，便于项目定制！
          </p>
        </div>
      </div>
    </div>
  )
}

export default App