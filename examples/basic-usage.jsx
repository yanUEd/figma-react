import React from 'react';
import { Box, Column, Row, ZStack } from '../src';

// 模拟其他组件
const Text = ({ children, type, color, fill }) => <div style={{ fontSize: type === 'title-lg' ? '24px' : '16px', color: color || fill }}>{children}</div>;
const Button = ({ children, variant, size }) => <button style={{ padding: size === 'sm' ? '8px 16px' : '12px 24px', background: variant === 'primary' ? '#0066ff' : '#f8f9fa', color: variant === 'primary' ? 'white' : '#333', border: 'none', borderRadius: '8px' }}>{children}</button>;
const Icon = ({ name }) => <div style={{ width: '20px', height: '20px', background: '#ddd' }}>{name}</div>;

// 登录页面示例
export const LoginPage = () => {
  return (
    <Column gap="$lg" padding="$xl" alignment="center-center" minHeight="100vh" fill="$surface">
      <Text type="title-lg" fill="$primary">欢迎回来</Text>

      <Column gap="$md" width="320px">
        <Box fill="$surface" padding="$md" strokeColor="$border" radius="$md">
          <Text fill="$muted">邮箱输入框</Text>
        </Box>
        <Box fill="$surface" padding="$md" strokeColor="$border" radius="$md">
          <Text fill="$muted">密码输入框</Text>
        </Box>
      </Column>

      <Row gap="$sm">
        <Button variant="secondary">取消</Button>
        <Button variant="primary">登录</Button>
      </Row>
    </Column>
  );
};

// 产品卡片示例
export const ProductCard = () => {
  const products = [
    { id: 1, title: "产品名称", description: "产品描述信息", price: "¥99", stock: 10, sales: 100 },
    { id: 2, title: "另一个产品", description: "更多产品信息", price: "¥199", stock: 5, sales: 50 },
  ];

  return (
    <Column gap="$md" padding="$lg" maxWidth="600px">
      {products.map(product => (
        <Box key={product.id} fill="$surface" padding="$lg" radius="$md"
             strokeColor="$border" strokeWeight="$sm" overflow="hidden">
          <Column gap="$sm">
            <Row distribution="space-between" alignment="top-left">
              <Column gap="$xs">
                <Text type="title-md">{product.title}</Text>
                <Text type="body-sm" fill="$muted">{product.description}</Text>
              </Column>
              <Text type="title-lg" fill="$primary">{product.price}</Text>
            </Row>
            <Row distribution="space-between" alignment="center-center">
              <Row gap="$sm">
                <Text type="body-xs" fill="$muted">库存: {product.stock}</Text>
                <Text type="body-xs" fill="$muted">销量: {product.sales}</Text>
              </Row>
              <Button variant="primary" size="sm">加入购物车</Button>
            </Row>
          </Column>
        </Box>
      ))}
    </Column>
  );
};

// 导航栏角标示例
export const NavigationBar = () => {
  return (
    <Row padding="x:$lg y:$md" fill="$surface"
         strokeColor="bottom:$divider" strokeWeight="bottom:1px"
         distribution="space-between" height="64px">
      <Row gap="$lg" alignment="center-center">
        <Icon name="logo" />
        <Row gap="$md">
          <Text fill="$primary">首页</Text>
          <Text>产品</Text>
          <Text>关于</Text>
        </Row>
      </Row>

      <ZStack width="40px" height="40px">
        <Box alignment="top-right" fill="$error" radius="full" width="16px" height="16px">
          <Text color="white" alignment="center-center" type="body-xs">3</Text>
        </Box>
        <Button variant="ghost" size="sm">
          <Icon name="notification" />
        </Button>
      </ZStack>
    </Row>
  );
};

// 设置列表示例
export const SettingsList = () => {
  return (
    <Column padding="$lg" gap="$sm" maxWidth="400px">
      <Text type="title-md">设置</Text>

      <Column fill="$surface" radius="$md" strokeColor="$border" strokeWeight="$sm" gap="0" overflow="hidden">
        <Box padding="$md" hover={{ fill: '$hover' }}>
          <Row distribution="space-between" alignment="center-center">
            <Row gap="$sm" alignment="center-center">
              <Icon name="user" />
              <Text>个人信息</Text>
            </Row>
            <Icon name="chevron-right" fill="$muted" />
          </Row>
        </Box>

        <Box padding="$md" strokeColor="top:$divider" strokeWeight="top:1px" hover={{ fill: '$hover' }}>
          <Row distribution="space-between" alignment="center-center">
            <Row gap="$sm" alignment="center-center">
              <Icon name="bell" />
              <Text>通知设置</Text>
            </Row>
            <Box width="44px" height="24px" fill="$success" radius="full" />
          </Row>
        </Box>

        <Box padding="$md" strokeColor="top:$divider" strokeWeight="top:1px" hover={{ fill: '$hover' }}>
          <Row distribution="space-between" alignment="center-center">
            <Row gap="$sm" alignment="center-center">
              <Icon name="lock" />
              <Text>隐私安全</Text>
            </Row>
            <Icon name="chevron-right" fill="$muted" />
          </Row>
        </Box>
      </Column>
    </Column>
  );
};

// 主示例应用
export const App = () => {
  return (
    <Column gap="$xl" padding="$lg" alignment="center-center">
      <Text type="title-lg" fill="$primary">@figma-react/layout 组件示例</Text>

      <Column gap="$lg" alignment="center-center">
        <Text type="title-md">1. 登录页面</Text>
        <LoginPage />
      </Column>

      <Column gap="$lg" alignment="center-center">
        <Text type="title-md">2. 产品卡片</Text>
        <ProductCard />
      </Column>

      <Column gap="$lg" alignment="center-center">
        <Text type="title-md">3. 导航栏角标</Text>
        <NavigationBar />
      </Column>

      <Column gap="$lg" alignment="center-center">
        <Text type="title-md">4. 设置列表</Text>
        <SettingsList />
      </Column>
    </Column>
  );
};