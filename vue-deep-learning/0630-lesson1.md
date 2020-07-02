 
### 组件通信

- 父子
   - props
   
   - $children
   ```javascript
      $children
      父组件可以通过$children访问子组件实现父子通信
      this.$children[1].sendToChild1();
   ```
    - $refs
   ```javascript
      
       this.$refs.child2.sendToChild1();
   ```
   - $attrs/$listeners
    > 包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。当一个组件没有 声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外)，并且可以通过 v- bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

    ```javascript
    // child:并未在props中声明foo 
     <p>{{$attrs.foo}}</p>
    // parent
    <HelloWorld foo="foo"/>
    ```
    
-  子父
   -  自定义事件

- 兄弟
   - $parent、 $root [兄弟节点之间可以通过共同祖辈搭桥]
   ```javascript
    // brother1
    this.$parent.$on('foo', handle)
    // brother2
    this.$parent.$emit('foo')
   ```
- 跨级
   - provide/inject
- 任意组件
  - vuex
  - event Bus 
  

  ```javascript 
   export default class Bus {
    constructor() {
        this.callbacks = {}
    }
    $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || [];
        this.callbacks[name].push(fn)
    }
    $emit(name, args) {
        if (this.callbacks[name]) {
            this.callbacks[name].forEach(cb => {
                cb(args)
            });
        }
    }
}```
- 

### 作用域插槽
- 匿名插槽

```javascript
    // comp1
    <div>
      <slot></slot>
    </div>
    // parent
    <comp>hello</comp>
```
- 具名插槽 [将内容分发到子组件具体位置]

```javascript
    // comp2
    <div>
      <slot></slot>
      <slot name="content"></slot>
    </div>
    // parent
    <Comp2>
    <!-- 默认插槽用default做参数 -->
    <template v-slot:default>具名插槽</template> <!-- 具名插槽用插槽名做参数 -->
    <template v-slot:content>内容...</template>
    </Comp2>
```
- 作用域插槽[分发内容要用到子组件中的数据]

```javascript     
    // comp3
    <div>
      <slot :foo="foo"></slot>
    </div>

    // parent
    <Comp3>
    <!-- 把v-slot的值指定为作用域上下文对象 --> 
    <template v-slot:default="slotProps"> 来自子组件数据:{{slotProps.foo}} </template>
    // 名为footer的插槽
    <template v-slot:footer="slotProps">{{slotProps.fc}}</template>
    </Comp3>
```



### 组件实例化
- vue.extend
- vue.component

```javascript
export  default  function  create(Component, props) {

const  Ctor = Vue.extend(Component)

const  comp = new  Ctor({

el:  document.createElement('div'),

propsData:  props

})

const  $el = comp.$el;

document.body.appendChild($el);
Ctor.prototype.remove = () => {
const  $el = comp.$el;

document.body.removeChild($el)

comp.$destroy();

}

  

// 方式二：借鸡生蛋

const  vm = new  Vue({
render(h) {
return  h(Component, { props })
}
}).$mount() // $mount()本质上将vdom=》dom
****
// 通过vm.$el获取生成的dom
document.body.appendChild(vm.$el)
// 删除函数
// 获取组件实例
const  comp = vm.$children[0]
comp.remove = () => {
document.body.removeChild(vm.$el)
vm.$destroy()

}

  

return  comp

}

// 组件中使用

```

