import { shallowMount } from '@vue/test-utils'
import Card from '@/components/layout/Card.vue'


describe('Card.vue', () => {
    let wrapper;
    const title = 'TODAY'
    beforeEach(() => {
        wrapper = shallowMount(Card, {
            props: { title }
        })
    })

    it('card renders on page load', () => {
        expect(wrapper.find('.container'))
    })
    it('renders props.title when passed', () => {
        expect(wrapper.props('title')).toEqual(title)
    })
}) 