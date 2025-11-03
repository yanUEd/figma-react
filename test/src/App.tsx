import { useState } from 'react'
import { Box, Column, Row, ZStack } from '@figma-react/layout'

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '32px', color: '#333', textAlign: 'center' }}>
        Figma Layout 组件默认值测试
      </h1>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ color: '#495057', marginBottom: '16px' }}>Column 组件 - 默认 top-center</h2>
        <Column
          width="300px"
          height="200px"
          fill="#f0f8ff"
          padding="16px"
          gap="12px"
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
          gap="16px"
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
        <h3 style={{ color: '#495057', marginBottom: '12px' }}>新的默认值总结：</h3>
        <ul style={{ color: '#666', lineHeight: '1.6' }}>
          <li><strong>Column</strong>: top-center (顶部开始 + 水平居中)</li>
          <li><strong>Row</strong>: center-left (垂直居中 + 左侧开始)</li>
          <li><strong>ZStack</strong>: center-center (完全居中)</li>
        </ul>
        <p style={{ color: '#28a745', marginTop: '12px', fontWeight: 'bold' }}>
          ✅ 这些默认值更符合实际使用场景，减少了手动设置alignment的需求
        </p>
      </div>
    </div>
  )
}

export default App