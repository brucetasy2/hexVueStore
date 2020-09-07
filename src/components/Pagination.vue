<template>
  <div>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{'disabled': pages.current_page === 1}"
        >
          <a v-if="pages.count > 1"
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="emitPages(pages.current_page - 1)"
          >
            <span aria-hidden="true">上一頁&laquo;</span>
          </a>
        </li>
        <li
          v-for="(item, index) in pages.total_pages"
          :key="index"
          class="page-item"
          :class="{'active': item === pages.current_page}"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="emitPages(item)"
          >{{ item }}</a>
        </li>
        <li
          class="page-item"
          :class="{'disabled': pages.current_page === pages.total_pages}"
        >
          <a  v-if="pages.count > 1"
            class="page-link"
            href="#"
            aria-label="Next"

            @click.prevent="emitPages(pages.current_page + 1)"
          >
            <span aria-hidden="true">下一頁&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    pages: {
      type: Object,
      default() {
        return {
        };
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {
    emitPages(item) {
      this.$emit('naviPages', item);
    },
  },
};
</script>
