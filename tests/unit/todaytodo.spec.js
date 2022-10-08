import { shallowMount } from '@vue/test-utils'
import TodayToDo from '@/components/TodayToDo.vue'
jest.mock('@/components/TodayToDo.vue')

describe('Card.vue', () => {
    let wrapper;
    const allTasks = [{ id: "7ae38d80-b399-4e60-b5ec-13d106e51b55", task: "Grocery Shopping", isToday: true, completed: false }];
    const isToday = true;

    beforeEach(() => {
        wrapper = shallowMount(TodayToDo, {
            propsData: {
                allTasks: allTasks,
                isToday: isToday
            },
            data() {
                return {
                    showTodayTask: true,
                };
            },
        })
    })

    it('TodayToDo renders on page load', () => {
        expect(wrapper.find('.container'))
    })
    it('renders props.allTasks & props.isToday when passed', () => {
        expect(wrapper.props('allTasks')).toEqual(allTasks)
        expect(wrapper.props('isToday')).toBe(true)
    })
})