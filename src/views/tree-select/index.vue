<template>
  <a-tree-select
    v-model:value="value"
    tree-data-simple-mode
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    placeholder="Please select"
    :load-data="onLoadData"
    @select="onSelect"
  />

  <div class="container">
    <div class="code-wrap">
      <div class="load-wrap">
        <span>loadData函数参数中的node如下</span>
        <pre>{{ onLoadDataParamsNode }}</pre>
      </div>

      <div class="select-wrap">
        <span>select函数参数如下</span>
        <pre>{{ onSelectParams }}</pre>
      </div>
    </div>

    <div class="problem-wrap" v-if="onSelectParams !== null">
      <ul>
        <li>
          疑问一：按照官方文档，select方法有<span class="text-tip-num">3个</span>参数；但实际只有
          <span class="text-tip-num">2个</span>
        </li>
        <li>
          建议一：对于官方文档中，对于loadData函数和select函数中，参数命名均为
          <span class="text-tip-num">node</span
          >。但是实际参数内容并不一致。可否进一步对参数进行命名，以便于开发者更好的理解参数的含义
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TreeSelectProps } from 'ant-design-vue'
import { ref, watch } from 'vue'
const value = ref<string>()
const treeData = ref<TreeSelectProps['treeData']>([
  { id: 1, pId: 0, value: '1', title: 'Expand to load' },
  { id: 2, pId: 0, value: '2', title: 'Expand to load' },
  { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true }
])

let onLoadDataParamsNode = ref(null)
let onSelectParams = ref(null)

watch(value, () => {
  console.log(value.value)
})

const genTreeNode = (parentId: number, isLeaf = false): TreeSelectProps['treeData'][number] => {
  const random = Math.random().toString(36).substring(2, 6)
  return {
    id: random,
    pId: parentId,
    value: random,
    title: isLeaf ? 'Tree Node' : 'Expand to load',
    isLeaf
  }
}
const onLoadData = (treeNode: TreeSelectProps['treeData'][number]) => {
  return new Promise((resolve) => {
    onLoadDataParamsNode.value = treeNode
    const { id } = treeNode.dataRef
    setTimeout(() => {
      treeData.value = treeData.value?.concat([
        genTreeNode(id, false),
        genTreeNode(id, true),
        genTreeNode(id, true)
      ])
      console.log(treeData.value)
      resolve(true)
    }, 300)
  })
}

const onSelect = (...args: any) => {
  console.log('args', args)
  onSelectParams.value = args
}
</script>

<style lang="less" scoped>
.container {
  display: flex;

  .code-wrap,
  .problem-wrap {
    flex: 1;
  }

  .problem-wrap {
    .text-tip-num {
      color: red;
    }
  }
}
</style>
