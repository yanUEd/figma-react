import { useState } from 'react'
import { Box, Column, Row, ZStack } from '@figma-react/layout'

function App() {
  const [showTokens, setShowTokens] = useState(false)

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation */}
      <Box
        fill="#f8f9fa"
        padding="16px 24px"
        style={{ borderBottom: '1px solid #dee2e6', position: 'sticky', top: '0', zIndex: 1000 }}
      >
        <Row alignment="top-right" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, color: '#495057', fontSize: '20px' }}>
            Figma Layout Components
          </h1>
          <Row gap="12px">
            <button
              onClick={() => setShowTokens(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: showTokens ? 'transparent' : '#007bff',
                color: showTokens ? '#007bff' : 'white',
                border: `1px solid #007bff`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              组件测试
            </button>

          </Row>
        </Row>
      </Box>

      {/* Content */}
      {showTokens ? (
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: '#495057', marginBottom: '16px' }}>Design Tokens</h2>
          <p style={{ color: '#6c757d' }}>
            Design Tokens 功能正在开发中...
          </p>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <p style={{ marginBottom: '24px', color: '#6c757d' }}>
            React + Vite 项目运行成功！展示 Figma Auto Layout 组件库效果
          </p>

          {/* Box 组件测试 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#495057', marginBottom: '16px' }}>Box 组件</h2>
            <Box
              width="200px"
              height="100px"
              fill="#e3f2fd"
              padding="16px"
              radius="8px"
              strokeColor="#90caf9"
              strokeWeight="1px"
            >
              这是一个 Box 组件
            </Box>
          </section>

          {/* Column 组件测试 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#495057', marginBottom: '16px' }}>Column 组件</h2>
            <Column
              width="300px"
              fill="#f3e5f5"
              padding="16px"
              gap="12px"
              radius="8px"
              strokeColor="#ce93d8"
              strokeWeight="1px"
            >
              <Box fill="#ce93d8" padding="8px" height="40px" radius="4px" alignment="center-center" style={{ color: 'white' }}>
                项目 1
              </Box>
              <Box fill="#ce93d8" padding="8px" height="40px" radius="4px" alignment="center-center" style={{ color: 'white' }}>
                项目 2
              </Box>
              <Box fill="#ce93d8" padding="8px" height="40px" radius="4px" alignment="center-center" style={{ color: 'white' }}>
                项目 3
              </Box>
            </Column>
          </section>

          {/* Row 组件测试 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#495057', marginBottom: '16px' }}>Row 组件</h2>
            <Row
              width="500px"
              fill="#e8f5e8"
              padding="16px"
              gap="12px"
              radius="8px"
              strokeColor="#a5d6a7"
              strokeWeight="1px"
            >
              <Box fill="#a5d6a7" padding="8px" width="100px" height="60px" radius="4px" alignment="center-center" style={{ color: 'white' }}>
                左侧
              </Box>
              <Box fill="#a5d6a7" padding="8px" width="120px" height="60px" radius="4px" alignment="center-center" style={{ color: 'white' }}>
                中间
              </Box>
              <Box fill="#a5d6a7" padding="8px" width="80px" height="60px" radius="4px" alignment="center-center" style={{ color: 'white' }}>
                右侧
              </Box>
            </Row>
          </section>

          {/* ZStack 组件测试 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#495057', marginBottom: '32px' }}>ZStack 组件</h2>

            <Column gap="40px">
              {/* 简单的两层演示 */}
              <Column gap="16px">
                <ZStack width="240px" height="160px" alignment="center-center">
                  {/* 顶层 - 深蓝色方块（第一个元素在最上层） */}
                  <Box
                    alignment="center-center"
                    fill="#1976d2"
                    width="60%"
                    height="60%"
                    radius="8px"
                    style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}
                  >
                    ZStack
                  </Box>
                  {/* 底层 - 浅蓝色背景 */}
                  <Box
                    fill="#e3f2fd"
                    width="100%"
                    height="100%"
                    radius="12px"
                    strokeColor="#2196f3"
                    strokeWeight="2px"
                  />
                </ZStack>
                <p style={{ fontSize: '16px', color: '#495057', margin: 0, textAlign: 'center' }}>
                  第一个元素在最上层 + 第二个元素在下层 = 层叠效果
                </p>
              </Column>

              {/* 三层演示 */}
              <Column gap="16px">
                <ZStack width="240px" height="160px" alignment="center-center">
                  {/* 顶层 - 深色（第一个元素在最上层） */}
                  <Box
                    alignment="center-center"
                    fill="#ff5722"
                    width="50%"
                    height="50%"
                    radius="6px"
                    style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    顶层
                  </Box>
                  {/* 中层 - 中等 */}
                  <Box
                    fill="#ffb74d"
                    width="80%"
                    height="80%"
                    radius="8px"
                  />
                  {/* 底层 - 浅色 */}
                  <Box
                    fill="#fff3e0"
                    width="100%"
                    height="100%"
                    radius="12px"
                    strokeColor="#ff9800"
                    strokeWeight="2px"
                  />
                </ZStack>
                <p style={{ fontSize: '16px', color: '#495057', margin: 0, textAlign: 'center' }}>
                  第1层(小) → 第2层(中) → 第3层(大)，第1个元素在最上层
                </p>
              </Column>
            </Column>
          </section>

          {/* ZStack Alignment 测试 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#495057', marginBottom: '16px' }}>ZStack Alignment 测试</h2>
            <Row gap="16px" wrap="true">
              {/* Top 行 */}
              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Top Left</h4>
                <ZStack width="120px" height="80px" alignment="top-left">
                  <Box fill="#1976d2" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>TL</Box>
                  <Box fill="#e3f2fd" width="100%" height="100%" strokeColor="#2196f3" strokeWeight="1px" />
                </ZStack>
              </Column>

              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Top Center</h4>
                <ZStack width="120px" height="80px" alignment="top-center">
                  <Box fill="#1976d2" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>TC</Box>
                  <Box fill="#e3f2fd" width="100%" height="100%" strokeColor="#2196f3" strokeWeight="1px" />
                </ZStack>
              </Column>

              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Top Right</h4>
                <ZStack width="120px" height="80px" alignment="top-right">
                  <Box fill="#1976d2" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>TR</Box>
                  <Box fill="#e3f2fd" width="100%" height="100%" strokeColor="#2196f3" strokeWeight="1px" />
                </ZStack>
              </Column>

              {/* Center 行 */}
              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Center Left</h4>
                <ZStack width="120px" height="80px" alignment="center-left">
                  <Box fill="#7b1fa2" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>CL</Box>
                  <Box fill="#f3e5f5" width="100%" height="100%" strokeColor="#ce93d8" strokeWeight="1px" />
                </ZStack>
              </Column>

              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Center Center</h4>
                <ZStack width="120px" height="80px" alignment="center-center">
                  <Box fill="#7b1fa2" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>CC</Box>
                  <Box fill="#f3e5f5" width="100%" height="100%" strokeColor="#ce93d8" strokeWeight="1px" />
                </ZStack>
              </Column>

              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Center Right</h4>
                <ZStack width="120px" height="80px" alignment="center-right">
                  <Box fill="#7b1fa2" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>CR</Box>
                  <Box fill="#f3e5f5" width="100%" height="100%" strokeColor="#ce93d8" strokeWeight="1px" />
                </ZStack>
              </Column>

              {/* Bottom 行 */}
              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Bottom Left</h4>
                <ZStack width="120px" height="80px" alignment="bottom-left">
                  <Box fill="#388e3c" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>BL</Box>
                  <Box fill="#e8f5e8" width="100%" height="100%" strokeColor="#a5d6a7" strokeWeight="1px" />
                </ZStack>
              </Column>

              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Bottom Center</h4>
                <ZStack width="120px" height="80px" alignment="bottom-center">
                  <Box fill="#388e3c" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>BC</Box>
                  <Box fill="#e8f5e8" width="100%" height="100%" strokeColor="#a5d6a7" strokeWeight="1px" />
                </ZStack>
              </Column>

              <Column gap="12px" width="160px">
                <h4 style={{ margin: 0, color: '#495057' }}>Bottom Right</h4>
                <ZStack width="120px" height="80px" alignment="bottom-right">
                  <Box fill="#388e3c" width="40px" height="30px" radius="4px" style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>BR</Box>
                  <Box fill="#e8f5e8" width="100%" height="100%" strokeColor="#a5d6a7" strokeWeight="1px" />
                </ZStack>
              </Column>
            </Row>
          </section>

          {/* 复杂布局测试 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#495057', marginBottom: '16px' }}>复杂布局测试</h2>
            <Column width="600px" fill="#f8f9fa" padding="20px" gap="20px" radius="12px" strokeColor="#dee2e6" strokeWeight="1px">
              <h3 style={{ margin: 0, color: '#495057' }}>卡片布局</h3>

              <Row width="fill" gap="16px" alignment="top-right" distribution="space-between">
                <Column width="160px" fill="white" padding="16px" gap="12px" radius="8px" strokeColor="#e9ecef" strokeWeight="1px">
                  <Box height="50px" width='fill' fill="#4fc3f7" radius="4px" />
                  <Box height="30px" width='fill' fill="#e1f5fe" radius="4px" />
                  <Box height="30px" width='fill' fill="#e1f5fe" radius="4px" />
                </Column>

                <Column width="160px" fill="white" padding="16px" gap="12px" radius="8px" strokeColor="#e9ecef" strokeWeight="1px">
                  <Box height="50px" width='fill' fill="#66bb6a" radius="4px" />
                  <Box height="30px" width='fill' fill="#e8f5e9" radius="4px" />
                  <Box height="30px" width='fill' fill="#e8f5e9" radius="4px" />
                </Column>

                <Column width="160px" fill="white" padding="16px" gap="12px" radius="8px" strokeColor="#e9ecef" strokeWeight="1px">
                  <Box height="50px" width='fill' fill="#ff7043" radius="4px" />
                  <Box height="30px" width='fill' fill="#fbe9e7" radius="4px" />
                  <Box height="30px" width='fill' fill="#fbe9e7" radius="4px" />
                </Column>
              </Row>
            </Column>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
