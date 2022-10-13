import { shallowMount } from '@vue/test-utils'
import AddTask from '@/components/AddTask.vue'

describe('AddTask.vue', () => {
    let wrapper;
    const id = "7ae38d80-b399-4e60-b5ec-13d106e51b55";
    const task = "Doctors Appointment";
    const completed = false;
    const isToday = true;
    const showTodayTask = true;
    const showMasterTask = false;

    const allTasks = [{ id: id, task: task, isToday: isToday, completed: completed }];
    const newTask = [{ id: id, task: task, isToday: isToday, completed: completed }];

    beforeEach(() => {
        wrapper = shallowMount(AddTask, {
            propsData: {
                allTasks: allTasks,
                isToday: isToday,
                showTodayTask: showTodayTask,
                showMasterTask: showMasterTask
            },
            data() {
                return {
                    newTask: {
                        id,
                        task,
                        isToday,
                        completed,
                    },
                };
            },
        })
    })

    it('addTask renders on page load', () => {
        expect(wrapper.find('.form'));
    })
    it('renders allTasks, isToday, showTodayTask, & showMasterTask when passed', () => {
        expect(wrapper.props('allTasks')).toEqual(allTasks);
        expect(wrapper.props('isToday')).toBe(true);
        expect(wrapper.props('showTodayTask')).toBe(true);
        expect(wrapper.props('showMasterTask')).toBe(false);
    })
    it('triggers', async () => {
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('click');
    })
    it('sets newTask data', () => {
        expect(wrapper.vm.newTask).toStrictEqual({
            id,
            task,
            isToday,
            completed
        })
    })
    it('emits the input to its parent', async () => {
        wrapper.vm.$emit('add-task', newTask);
      
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('add-task')).toBeTruthy();
    })
    it('emits the toggle task to its parent', async () => {
        wrapper.vm.$emit('toggle-today-task');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('toggle-today-task')).toBeTruthy();
        wrapper.vm.$emit('toggle-master-task');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('toggle-master-task')).toBeTruthy();
    })
})