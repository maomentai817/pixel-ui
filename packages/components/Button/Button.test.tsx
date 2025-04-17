import { describe, it, test, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, defineComponent } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { withInstall } from '@pixel-ui/utils'
import { PxButton, PxButtonGroup } from '.'

import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import Icon from '../Icon/Icon.vue'

describe('Button/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxButton.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxButton).toBe(Button)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Button component', () => {
    const enhancedButton = withInstall(Button)
    expect(enhancedButton).toBe(PxButton)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedButton = withInstall(Button)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedButton).toHaveProperty('install')
  })
})

describe('ButtonGroup/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxButtonGroup.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxButtonGroup).toBe(ButtonGroup)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance ButtonGroup component', () => {
    const enhancedButtonGroup = withInstall(ButtonGroup)
    expect(enhancedButtonGroup).toBe(PxButtonGroup)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedButtonGroup = withInstall(ButtonGroup)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedButtonGroup).toHaveProperty('install')
  })
})

describe('Button.vue', () => {
  // Props: type
  it('should has the correct type class when type prop is set', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'base']
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any }
      })
      expect(wrapper.classes()).toContain(`px-button--${type}`)
    })
  })
  // Props: size
  it('should has the correct size class when size prop is set', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any }
      })
      expect(wrapper.classes()).toContain(`px-button--${size}`)
    })
  })
  // Props: plain, round circle
  it.each([
    ['plain', 'is-plain'],
    ['round', 'is-round'],
    ['circle', 'is-circle'],
    ['disabled', 'is-disabled'],
    ['loading', 'is-loading']
  ])(
    'should has the correct class when prop %s is set to true',
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ['PxIcon']
        }
      })
      expect(wrapper.classes()).toContain(className)
    }
  )

  it('should has the correct native type attribute when native-type prop is set', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' }
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect((wrapper.element as any).type).toBe('submit')
  })
  //! test the click event with and without throttle
  it.each([
    ['withoutThrottle', false],
    ['withThrottle', true]
  ])('emit click event %s', async (_, useThrottle) => {
    const clickSpy = vi.fn()
    const WrapperComponent = defineComponent({
      render() {
        return h(Button, {
          onClick: clickSpy,
          useThrottle,
          throttleDuration: 400
        })
      }
    })

    const wrapper = mount(WrapperComponent)

    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    expect(clickSpy).toBeCalledTimes(useThrottle ? 1 : 3)
  })

  // Props: tag
  it('should renders the custom tag when tag prop is set', () => {
    const wrapper = mount(Button, {
      props: { tag: 'a' }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })

  // events: click
  it('should emits a click event when the button is clicked', async () => {
    const wrapper = mount(Button, {})
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  // expection handling: loading state
  it('should display loading icon and not emit click event when button is loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true, loadingIcon: 'spinner' },
      global: {
        stubs: ['PxButton']
      }
    })

    await flushPromises()

    const iconElement = wrapper.findComponent(Icon)
    // loading-icon 存在
    expect(wrapper.find('.loading-icon').exists()).toBe(true)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.props('icon')).toBe('spinner')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  // loading-btn test
  test('loading button', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
        loadingIcon: 'spinner'
      },
      slots: {
        default: 'loading-btn'
      },
      global: {
        stubs: ['PxIcon']
      }
    })

    // class
    expect(wrapper.classes()).toContain('is-loading')

    // attrs
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeTruthy()

    // events
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')

    // icon
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    // expect(iconElement.props('icon')).toBe('spinner')
    expect(iconElement.attributes('icon')).toBe('spinner')
  })

  // icon-btn
  test('icon button', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'search'
      },
      slots: {
        default: 'icon button'
      },
      global: {
        stubs: ['PxIcon']
      }
    })

    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('search')
  })

  // icon rotation test
  it('should apply correct styles when rotation is set', () => {
    const wrapper = mount(Icon, {
      props: { icon: 'spinner', rotation: 90 }
    })

    const iconElement = wrapper.find('i')

    // ✅ 确保 rotation 被正确应用
    expect(iconElement.element.style.rotate).toBe('90deg')
  })

  it('should not have rotate style when rotation is not set', () => {
    const wrapper = mount(Icon, {
      props: { icon: 'spinner' }
    })

    const iconElement = wrapper.find('i')

    // ✅ 确保默认情况下没有 rotate
    expect(iconElement.element.style.rotate).toBe('')
  })

  //! CSS Paint Worklets API 测试
  describe('PxCard - CSS Houdini Paint Worklet', () => {
    const originalCSS = (globalThis as any).CSS

    afterEach(() => {
      ;(globalThis as any).CSS = originalCSS
      vi.restoreAllMocks()
    })

    it('should register the Paint Worklet pixelpanel when supported', async () => {
      ;(globalThis as any).CSS = {
        paintWorklet: {
          addModule: vi.fn()
        }
      }

      mount(Button)

      expect(
        (globalThis as any).CSS.paintWorklet.addModule
      ).toHaveBeenCalledWith(
        expect.stringContaining('/worklets/dist/pixelbox.worklet.js')
      )
    })

    it('should warn if CSS Houdini Paint Worklet is not supported', () => {
      console.warn = vi.fn()

      globalThis.CSS = {} as any

      mount(Button)

      expect(console.warn).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining(
            'CSS Houdini Paint Worklet API is not supported in this browser.'
          )
        })
      )
    })

    it('should log an error if loading the Paint Worklet fails', () => {
      const error = new Error('Mock addModule error')
      console.error = vi.fn()
      ;(globalThis as any).CSS = {
        paintWorklet: {
          addModule: vi.fn(() => {
            throw error
          })
        }
      }

      mount(Button)

      expect(console.error).toHaveBeenCalledWith(
        'Error loading Paint Worklet:',
        error
      )
    })
  })
})

// button-group test
describe('ButtonGroup.vue', () => {
  //existing test
  test('basic button group', async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    ))

    expect(wrapper.classes()).toContain(`px-button-group`)
  })

  // size prop test
  test('button group size', () => {
    const size = ['large', 'default', 'small']
    size.forEach((size) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size as any}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`px-button--${size}`)
    })
  })

  // type prop test
  test('button group type', () => {
    const types = ['base', 'primary', 'success', 'warning', 'danger']
    types.forEach((type) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type as any}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`px-button--${type}`)
    })
  })

  // disabled prop test
  test('button group disabled', () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button)
    expect(buttonWrapper.classes()).toContain(`is-disabled`)
  })

  // round prop test
  test('button group round', () => {
    const wrapper = mount(() => (
      <ButtonGroup round>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button)
    expect(buttonWrapper.classes()).toContain(`is-round`)
  })

  // circle prop test
  test('button group circle', () => {
    const wrapper = mount(() => (
      <ButtonGroup circle>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button)
    expect(buttonWrapper.classes()).toContain(`is-circle`)
  })

  // custom color prop test
  test('button group custom color', () => {
    const wrapper = mount(() => (
      <ButtonGroup color="#626aef">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button)
    expect(buttonWrapper.classes()).toContain(`is-custom`)
  })
})
