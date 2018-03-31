<template>
  <div class="navbar" id="navbar">
    <div class="breadcrumb">
      <div class="item" :key="item.path" v-for="(item, index) in paths">
        <a class="title" :href="item.path" v-if="!index">
          <span>{{item.name}}</span>
        </a>
        <a class="title" :href="item.path" v-else>{{item.name}}</a>
        <span class="separator">/</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      paths: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '大学时光',
          path: '/大学时光'
        },
        {
          name: '大学毕业',
          path: '/大学时光/大学毕业'
        }
      ]
    }
  }
}
</script>

<style lang="less">
#navbar.navbar {
    width: 100%;
    background: #FFF;
    border-bottom: 1px solid #E8ECF0;

    .breadcrumb {
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        padding: 0 10px;
    }

    .description {
        padding: 10px 10px;
        margin-top: -20px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
    }

    .breadcrumb>.item {
        display: inline-block;

        a.title {
            color: rgba(0,0,0,.65);
            transition: color .3s;
            background: transparent;
            text-decoration: none;
            outline: none;
            cursor: pointer;

            &:hover {
                color: #49a9ee;
            }
        }

        .separator {
            margin: 0 3px;
            color: rgba(0,0,0,.3);
        }

        &:last-child {
            a.title {
                font-weight: 700;
                color: rgba(0,0,0,.65);
            }
            .separator {
                display: none;
            }
        }
    }
}
</style>
