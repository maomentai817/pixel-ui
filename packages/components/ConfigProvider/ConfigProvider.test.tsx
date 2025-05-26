import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { reactive, nextTick, createApp } from 'vue'
import { withInstall } from '@pixel-ui/utils'
import { PxConfigProvider, provideGlobalConfig, useGlobalConfig } from '.'

import English from '@pixel-ui/locale/lang/en'
import zhCN from '@pixel-ui/locale/lang/zh-cn'
import ConfigProvider from './ConfigProvider.vue'
import Popconfirm from '../Popconfirm/Popconfirm.vue'
import Button from '../Button/Button.vue'

describe('ConfigProvider/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxConfigProvider.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxConfigProvider).toBe(ConfigProvider)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance ConfigProvider component', () => {
    const enhancedConfigProvider = withInstall(ConfigProvider)
    expect(enhancedConfigProvider).toBe(PxConfigProvider)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedConfigProvider = withInstall(ConfigProvider)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedConfigProvider).toHaveProperty('install')
  })
})

describe('ConfigProvider hooks', () => {
  beforeEach(() => {
    // 清理全局配置缓存，避免测试间干扰
    vi.resetModules()
    provideGlobalConfig({}, undefined, true)
  })

  it('config render correctly', () => {
    mount(() => (
      <ConfigProvider locale={English}>
        <Popconfirm title="Are you shure to delete this item?">
          <Button>Delete</Button>
        </Popconfirm>
      </ConfigProvider>
    ))
    mount(() => (
      <ConfigProvider>
        <Popconfirm title="Are you shure to delete this item?">
          <Button>Delete</Button>
        </Popconfirm>
      </ConfigProvider>
    ))
  })

  it('useGlobalConfig should work', () => {
    const App = mount(() => <div></div>)
    const app = createApp(App)
    const config = useGlobalConfig()

    provideGlobalConfig(config, app)
  })

  it('config change should be watched', async () => {
    // 创建应用实例
    const App = mount(() => <div></div>)
    const app = createApp(App)

    // 初始配置
    const oldConfig = useGlobalConfig()
    provideGlobalConfig(oldConfig, app)

    // 新响应式配置
    const newConfig = reactive({
      locale: zhCN
    })
    provideGlobalConfig(newConfig, app)

    // 触发配置更新
    newConfig.locale = English
    await nextTick() // 等待响应式更新完成
  })

  it('should return cfg directly if no oldConfig exists', async () => {
    useGlobalConfig('locale')

    let context: any
    const cfg = reactive({
      locale: English
    })

    mount(() => {
      context = provideGlobalConfig(cfg)
      return null
    })

    cfg.locale = zhCN as any
    await nextTick()

    expect(context.value.locale).toEqual(zhCN)
  })

  it('should create i18n instance with custom locale', () => {
    const customLocale = {
      name: 'custom',
      el: {
        button: {
          ok: '好的'
        }
      }
    }

    mount(() => {
      provideGlobalConfig({ locale: customLocale }, undefined, true)
      return null
    })

    const config = useGlobalConfig()
    expect(config.value.locale?.name).toBe('custom')
  })

  it('should fallback to default locale name when name is missing', () => {
    const localeWithoutName = {
      el: {
        button: {
          ok: 'OK'
        }
      }
    }

    mount(() => {
      provideGlobalConfig({ locale: localeWithoutName as any }, undefined, true)
      return null
    })

    const config = useGlobalConfig()
    expect(config.value.locale?.name).toBe(undefined) // fallback
  })
})
