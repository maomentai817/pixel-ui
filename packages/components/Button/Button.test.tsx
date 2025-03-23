import { describe, it, test, expect, vi, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import { h, defineComponent } from 'vue'

import Button from "./Button.vue"
import Icon from '../Icon/Icon.vue'

declare global {
  interface CSS {
    paintWorklet: {
      addModule: (url: string) => void
    }
  }
  var CSS: CSS
}

describe('Button.vue', () => { 
  // Props: type
  it('should has the correct type class when type prop is set', () => { 
    const types = ['primary', 'success', 'warning', 'danger', 'base']
    types.forEach(type => {
      const wrapper = mount(Button, {
        props: { type: type as any },
      })
      expect(wrapper.classes()).toContain(`px-button--${type}`)
    })
  })
  // Props: size
  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      });
      expect(wrapper.classes()).toContain(`px-button--${size}`);
    });
  });
  // Props: plain, round circle
  it.each([
    ['plain', 'is-plain'],
    ['round', 'is-round'],
    ['circle', 'is-circle'],
    ['disabled', 'is-disabled'],
    ['loading', 'is-loading'],
  ])(
    'should has the correct class when prop %s is set to true',
    (prop, className) => { 
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ['PxIcon'],
        }
      })
      expect(wrapper.classes()).toContain(className)
    }
  )

  it('should has the correct native type attribute when native-type prop is set', () => { 
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect((wrapper.element as any).type).toBe('submit')
  })
  //! test the click event with and without throttle
  it.each([
    ['withoutThrottle', false],
    ['withThrottle', true],
  ])('emit click event %s', async (_, useThrottle) => { 
    const clickSpy = vi.fn()
    const WrapperComponent = defineComponent({
      render() {
        return h(Button, {
          onClick: clickSpy,
          useThrottle,
          throttleDuration: 400,
        })
      },
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
      props: { tag: 'a' },
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
    expect(iconElement.props('icon')).toBe('spinner')
  })

  // icon-btn
  test("icon button", () => {
    const wrapper = mount(Button, {
      props: {
        icon: "search",
      },
      slots: {
        default: "icon button",
      },
      global: {
        stubs: ["PxIcon"],
      },
    })

    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes("icon")).toBe("search")
  })

  // icon rotation test
  it("should apply correct styles when rotation is set", () => {
    const wrapper = mount(Icon, {
      props: { icon: "spinner", rotation: 90 },
    })

    const iconElement = wrapper.find("i")

    // ✅ 确保 rotation 被正确应用
    expect(iconElement.element.style.rotate).toBe("90deg")
  })

  it("should not have rotate style when rotation is not set", () => {
    const wrapper = mount(Icon, {
      props: { icon: "spinner" },
    })

    const iconElement = wrapper.find("i")

    // ✅ 确保默认情况下没有 rotate
    expect(iconElement.element.style.rotate).toBe("")
  })

  //! CSS Paint Worklets API 测试
  describe('when browser supports Paint Worklet ', () => {
    beforeEach(() => {
      // 模拟支持 Paint Worklet 的环境
      (globalThis as any).CSS = {
        paintWorklet: {
          addModule: vi.fn()
        }
      };
    });

    it('call the addModule to load Worklet', () => {
      const workletURL = "mock-pixelbox.js";
      if ('paintWorklet' in CSS) {
        (CSS as any).paintWorklet.addModule(workletURL);
      } else {
        console.warn('CSS Houdini Paint Worklet API is not supported in this browser.');
      }

      expect((CSS as any).paintWorklet.addModule).toHaveBeenCalledWith(workletURL);
    });
  });

  describe('then browser not supports Paint Worklet', () => {
    beforeEach(() => {
      // 模拟不支持 Paint Worklet 的环境
      (globalThis as any).CSS = {}; // 确保 CSS 对象存在，但无 paintWorklet 属性
      if ('paintWorklet' in (globalThis as any).CSS) {
        delete (globalThis as any).CSS.paintWorklet; // 确保 paintWorklet 被移除
      }
    });

    it('trigger console.warn', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn'); // 监控 console.warn
      const workletURL = "mock-pixelbox.js";

      if ('paintWorklet' in CSS) {
        (CSS as any).paintWorklet.addModule(workletURL);
      } else {
        console.warn('CSS Houdini Paint Worklet API is not supported in this browser.');
      }

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'CSS Houdini Paint Worklet API is not supported in this browser.'
      );
      consoleWarnSpy.mockRestore(); // 清理监控
    });
  });
})