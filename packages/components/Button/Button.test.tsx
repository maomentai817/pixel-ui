import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

import Button from "./Button.vue"

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
  // it.each([
  //   ['withoutThrottle', false],
  //   ['withThrottle', true],
  // ])('emit click event %s', async (_, useThrottle) => { 
  //   const clickSpy = vi.fn()
  //   const wrapper = mount(() => (
  //     <Button
  //       onClick={clickSpy}
  //       {...{
  //         useThrottle,
  //         throttleDuration: 400,
  //       }}
  //     />
  //   ))

  //   await wrapper.get('button').trigger('click')
  //   expect(clickSpy).toHaveBeenCalled()
  // })
  
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
})