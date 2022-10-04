import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

jest.useFakeTimers();

describe('Splash.vue', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(App, {
            data() {
                return {
                    splash: true
                }
            }
        })
    })

    it('splash renders on page load', () => {
        jest.advanceTimersByTime(2000);
        expect(wrapper.vm.splash).toBe(false)
    })
})