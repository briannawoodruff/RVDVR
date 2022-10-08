import { shallowMount } from '@vue/test-utils'
import SingleTask from '@/components/SingleTask.vue'

describe('SingleTask.vue', () => {
    let wrapper;
    const task = [{ id: "7ae38d80-b399-4e60-b5ec-13d106e51b55", task: "Grocery Shopping", isToday: true, completed: false }];

    beforeEach(() => {
        wrapper = shallowMount(SingleTask, {
            propsData: {
                task: task
            },
        })

    })

    it('emits the input to its parent', async () => {
        wrapper.vm.$emit('delete-task', task);

        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('delete-task')).toBeTruthy();
    })
})