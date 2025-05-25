import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import { useLocale } from '../useLocale'
import { mount } from '@vue/test-utils'
// import English from '@pixel-ui/locale/lang/en'

describe('useLocale', () => {
  it('returns default i18n when no overrides provided', () => {
    const wrapper = mount({
      setup() {
        const i18n = useLocale()
        return () => <div>{i18n.value.t('el.popconfirm.cancelButtonText')}</div>
      }
    })

    expect(wrapper.text()).toBe('No')
  })

  it('returns overridden i18n when localeOverrides is provided', async () => {
    const zhCN = {
      name: 'zh-cn',
      el: {
        popconfirm: {
          cancelButtonText: '取消'
        }
      }
    }

    const overrideRef = ref(zhCN)

    const wrapper = mount({
      setup() {
        const i18n = useLocale(overrideRef)
        return () => <div>{i18n.value.t('el.popconfirm.cancelButtonText')}</div>
      }
    })

    await nextTick()
    expect(wrapper.text()).toBe('取消')
  })
})
