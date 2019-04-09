Component({
    data: {
        name: 'sss'
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    externalClasses: ['self-class'],
    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached() { 
            this.handleInput();
        },
        // 在组件实例被移动到节点树另一个位置时执行
        moved() { },
        // 在组件实例被从页面节点树移除时执行
        detached() { },
    },
    methods: {
        handleInput(){
            console.log('demo 页面的输出');
        }
    }
})