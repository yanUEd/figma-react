import React, { useState } from 'react'
import { Box, Column, Row, ZStack } from '@figma-react/layout'
import TokenExample from './TokenExample'

function App() {
  const [showTokens, setShowTokens] = useState(false)

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation */}
      <Box
        backgroundColor="#f8f9fa"
        padding="16px 24px"
        borderBottom="1px solid #dee2e6"
        position="sticky"
        top="0"
        zIndex={1000}
      >
        <Row justifyContent="space-between" alignItems="center">
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
            <button
              onClick={() => setShowTokens(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: showTokens ? '#007bff' : 'transparent',
                color: showTokens ? 'white' : '#007bff',
                border: `1px solid #007bff`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Design Tokens
            </button>
          </Row>
        </Row>
      </Box>

      {/* Content */}
      {showTokens ? (
        <TokenExample />
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
              <Box fill="#ce93d8" padding="8px" height="40px" radius="4px" color="white" alignItems="center" justifyContent="center">
                项目 1
              </Box>
              <Box fill="#ce93d8" padding="8px" height="40px" radius="4px" color="white" alignItems="center" justifyContent="center">
                项目 2
              </Box>
              <Box fill="#ce93d8" padding="8px" height="40px" radius="4px" color="white" alignItems="center" justifyContent="center">
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
              <Box fill="#a5d6a7" padding="8px" width="100px" height="60px" radius="4px" color="white" alignItems="center" justifyContent="center">
                左侧
              </Box>
              <Box fill="#a5d6a7" padding="8px" width="120px" height="60px" radius="4px" color="white" alignItems="center" justifyContent="center">
                中间
              </Box>
              <Box fill="#a5d6a7" padding="8px" width="80px" height="60px" radius="4px" color="white" alignItems="center" justifyContent="center">
                右侧
              </Box>
            </Row>
          </section>

          {/* 复杂布局测试 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#495057', marginBottom: '16px' }}>复杂布局测试</h2>
            <Column width="600px" fill="#f8f9fa" padding="20px" gap="20px" radius="12px" strokeColor="#dee2e6" strokeWeight="1px">
              <h3 style={{ margin: 0, color: '#495057' }}>卡片布局</h3>

              <Row width="fill" gap="16px" distribution="space-between">
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
