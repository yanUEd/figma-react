import React from 'react'
import { Box, Column, Row } from '@figma-react/layout'
import { resolvedTokens } from './tokens'

const TokenExample = () => {
  return (
    <div style={{
      padding: resolvedTokens.spacing.lg,
      fontFamily: resolvedTokens.typography.fontFamily.sans,
      fill: resolvedTokens.colors.background.secondary,
      minHeight: '100vh'
    }}>
      <Box
        fill={resolvedTokens.colors.primary.blue}
        padding={resolvedTokens.spacing.lg}
        borderRadius={resolvedTokens.borderRadius.md}
        color={resolvedTokens.colors.neutral.white}
        marginBottom={resolvedTokens.spacing.lg}
      >
        <h1 style={{
          margin: 0,
          fontSize: resolvedTokens.typography.fontSize.xxxl,
          fontWeight: resolvedTokens.typography.fontWeight.bold,
          lineHeight: resolvedTokens.typography.lineHeight.tight
        }}>
          Token Design System
        </h1>
      </Box>

      <Column gap={resolvedTokens.spacing.lg}>
        {/* Color Palette */}
        <Box fill={resolvedTokens.colors.neutral.white} padding={resolvedTokens.spacing.md} borderRadius={resolvedTokens.borderRadius.md}>
          <h2 style={{ margin: 0, marginBottom: resolvedTokens.spacing.md, color: resolvedTokens.colors.text.primary }}>
            颜色系统
          </h2>
          <Row gap={resolvedTokens.spacing.sm}>
            {Object.entries(resolvedTokens.colors.primary).map(([name, color]) => (
              <Column key={name} alignItems="center" gap={resolvedTokens.spacing.xs}>
                <Box
                  width="60px"
                  height="60px"
                  fill={color}
                  borderRadius={resolvedTokens.borderRadius.md}
                />
                <Box
                  fontSize={resolvedTokens.typography.fontSize.xs}
                  color={resolvedTokens.colors.text.secondary}
                  textAlign="center"
                >
                  {name}
                </Box>
              </Column>
            ))}
          </Row>
        </Box>

        {/* Typography Scale */}
        <Box fill={resolvedTokens.colors.neutral.white} padding={resolvedTokens.spacing.md} borderRadius={resolvedTokens.borderRadius.md}>
          <h2 style={{ margin: 0, marginBottom: resolvedTokens.spacing.md, color: resolvedTokens.colors.text.primary }}>
            字体系统
          </h2>
          <Column gap={resolvedTokens.spacing.sm}>
            {Object.entries(resolvedTokens.typography.fontSize).map(([name, size]) => (
              <Box key={name}>
                <div style={{
                  fontSize: size,
                  fontWeight: resolvedTokens.typography.fontWeight.normal,
                  lineHeight: resolvedTokens.typography.lineHeight.normal,
                  color: resolvedTokens.colors.text.primary
                }}>
                  {name}: The quick brown fox jumps over the lazy dog
                </div>
                <div style={{
                  fontSize: resolvedTokens.typography.fontSize.xs,
                  color: resolvedTokens.colors.text.secondary,
                  marginTop: resolvedTokens.spacing.xs
                }}>
                  {size} / {resolvedTokens.typography.fontWeight.normal}
                </div>
              </Box>
            ))}
          </Column>
        </Box>

        {/* Spacing Scale */}
        <Box fill={resolvedTokens.colors.neutral.white} padding={resolvedTokens.spacing.md} borderRadius={resolvedTokens.borderRadius.md}>
          <h2 style={{ margin: 0, marginBottom: resolvedTokens.spacing.md, color: resolvedTokens.colors.text.primary }}>
            间距系统
          </h2>
          <Column gap={resolvedTokens.spacing.md}>
            {Object.entries(resolvedTokens.spacing).map(([name, spacing]) => (
              <Row key={name} alignItems="center" gap={resolvedTokens.spacing.md}>
                <Box
                  width="80px"
                  fill={resolvedTokens.colors.primary.blue}
                  borderRadius={resolvedTokens.borderRadius.sm}
                  padding={resolvedTokens.spacing.xs}
                  color="white"
                  fontSize={resolvedTokens.typography.fontSize.xs}
                  alignItems="center"
                  justifyContent="center"
                >
                  参考
                </Box>
                <Row
                  flex={1}
                  alignItems="center"
                  gap={spacing}
                  backgroundColor={resolvedTokens.colors.background.tertiary}
                  padding={resolvedTokens.spacing.xs}
                  borderRadius={resolvedTokens.borderRadius.sm}
                >
                  <Box
                    width="20px"
                    height="20px"
                    fill={resolvedTokens.colors.primary.green}
                    borderRadius="50%"
                  />
                  <Box
                    width="20px"
                    height="20px"
                    fill={resolvedTokens.colors.primary.red}
                    borderRadius="50%"
                  />
                </Row>
                <Box
                  minWidth="60px"
                  padding={`${resolvedTokens.spacing.xs} ${resolvedTokens.spacing.sm}`}
                  fill={resolvedTokens.colors.neutral.gray100}
                  borderRadius={resolvedTokens.borderRadius.sm}
                  fontSize={resolvedTokens.typography.fontSize.sm}
                  color={resolvedTokens.colors.text.primary}
                  textAlign="center"
                >
                  {spacing}
                </Box>
              </Row>
            ))}
          </Column>
        </Box>

        {/* Component Examples */}
        <Box fill={resolvedTokens.colors.neutral.white} padding={resolvedTokens.spacing.md} borderRadius={resolvedTokens.borderRadius.md}>
          <h2 style={{ margin: 0, marginBottom: resolvedTokens.spacing.md, color: resolvedTokens.colors.text.primary }}>
            组件示例
          </h2>
          <Column gap={resolvedTokens.spacing.md}>
            <Row gap={resolvedTokens.spacing.sm}>
              <Box
                fill={resolvedTokens.colors.primary.green}
                color={resolvedTokens.colors.neutral.white}
                padding={`${resolvedTokens.spacing.sm} ${resolvedTokens.spacing.md}`}
                borderRadius={resolvedTokens.borderRadius.sm}
                fontSize={resolvedTokens.typography.fontSize.sm}
                fontWeight={resolvedTokens.typography.fontWeight.medium}
              >
                成功按钮
              </Box>
              <Box
                fill={resolvedTokens.colors.primary.red}
                color={resolvedTokens.colors.neutral.white}
                padding={`${resolvedTokens.spacing.sm} ${resolvedTokens.spacing.md}`}
                borderRadius={resolvedTokens.borderRadius.sm}
                fontSize={resolvedTokens.typography.fontSize.sm}
                fontWeight={resolvedTokens.typography.fontWeight.medium}
              >
                危险按钮
              </Box>
              <Box
                fill="transparent"
                color={resolvedTokens.colors.primary.blue}
                padding={`${resolvedTokens.spacing.sm} ${resolvedTokens.spacing.md}`}
                borderRadius={resolvedTokens.borderRadius.sm}
                fontSize={resolvedTokens.typography.fontSize.sm}
                fontWeight={resolvedTokens.typography.fontWeight.medium}
                border={`1px solid ${resolvedTokens.colors.primary.blue}`}
              >
                边框按钮
              </Box>
            </Row>

            <Box
              fill={resolvedTokens.colors.background.tertiary}
              padding={resolvedTokens.spacing.md}
              borderRadius={resolvedTokens.borderRadius.md}
              border={`1px solid ${resolvedTokens.colors.neutral.gray200}`}
            >
              <div style={{
                fontSize: resolvedTokens.typography.fontSize.sm,
                color: resolvedTokens.colors.text.secondary,
                marginBottom: resolvedTokens.spacing.xs
              }}>
                提示信息
              </div>
              <div style={{
                fontSize: resolvedTokens.typography.fontSize.base,
                color: resolvedTokens.colors.text.primary
              }}>
                这是一个使用设计tokens构建的信息卡片
              </div>
            </Box>
          </Column>
        </Box>
      </Column>
    </div>
  )
}

export default TokenExample