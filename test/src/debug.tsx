import { Box, Column, Row, ZStack } from '@figma-react/layout'

// 添加调试函数
const debugAlignment = (componentName: string, element: HTMLElement) => {
  const styles = window.getComputedStyle(element);
  console.log(`${componentName} alignment:`, {
    display: styles.display,
    flexDirection: styles.flexDirection,
    alignItems: styles.alignItems,
    justifyContent: styles.justifyContent,
  });
};

export const DebugComponent = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Debug Alignment Defaults</h1>

      <div style={{ marginBottom: '40px' }}>
        <h3>Column (should be top-center)</h3>
        <div ref={el => el && setTimeout(() => debugAlignment('Column', el), 100)}>
          <Column
            width="200px"
            height="100px"
            fill="#e3f2fd"
            strokeColor="#2196f3"
            strokeWeight="2px"
            radius="4px"
          >
            <Box width="80px" height="20px" fill="#1976d2" />
            <Box width="80px" height="20px" fill="#1565c0" />
          </Column>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Row (should be center-left)</h3>
        <div ref={el => el && setTimeout(() => debugAlignment('Row', el), 100)}>
          <Row
            width="300px"
            height="80px"
            fill="#e8f5e8"
            strokeColor="#4caf50"
            strokeWeight="2px"
            radius="4px"
          >
            <Box width="40px" height="40px" fill="#388e3c" />
            <Box width="40px" height="40px" fill="#2e7d32" />
          </Row>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>ZStack (should be center-center)</h3>
        <div ref={el => el && setTimeout(() => debugAlignment('ZStack', el), 100)}>
          <ZStack
            width="150px"
            height="100px"
            fill="#fff3e0"
            strokeColor="#ff9800"
            strokeWeight="2px"
            radius="4px"
          >
            <Box width="60px" height="40px" fill="#f57c00" />
            <Box width="100%" height="100%" fill="#ffcc02" opacity="0.3" />
          </ZStack>
        </div>
      </div>
    </div>
  );
};

export default DebugComponent;