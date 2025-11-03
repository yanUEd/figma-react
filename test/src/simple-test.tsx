import { COMPONENT_DEFAULTS } from '@figma-react/layout'

console.log('COMPONENT_DEFAULTS:', COMPONENT_DEFAULTS)

export default function SimpleTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>检查 COMPONENT_DEFAULTS</h1>
      <p>Column 默认: {COMPONENT_DEFAULTS.column.alignment}</p>
      <p>Row 默认: {COMPONENT_DEFAULTS.row.alignment}</p>
      <p>ZStack 默认: {COMPONENT_DEFAULTS.zstack.alignment}</p>
    </div>
  )
}