import { shallowMount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'

describe('TaskList.vue', () => {
    let wrapper;
    const allTasks = [{ id: "7ae38d80-b399-4e60-b5ec-13d106e51b55", task: "Grocery Shopping", isToday: true, completed: false }];
    const isToday = true;

    beforeEach(() => {
        wrapper = shallowMount(TaskList, {
            propsData: {
                allTasks: allTasks,
                isToday: isToday
            },
            data() {
                return {
                    showTodayTask: true,
                };
            }
        })
    })

    it('TodayToDo renders on page load', () => {
        expect(wrapper.find('.container'));
    })
    it('renders allTasks & isToday when passed', () => {
        expect(wrapper.props('allTasks')).toEqual(allTasks);
        expect(wrapper.props('isToday')).toBe(isToday);
    })
})