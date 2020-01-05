<template>
  <LoadingSpinner v-if="loadingRepository" />
  <div class="wrapper" v-else>
    <router-link to="/">Go Back to Repositories</router-link>
    <div class="repository-info">
      <img v-bind:src="repository.owner.avatar_url" v-bind:alt="repository.full_name" />

      <h1>{{ repository.name }}</h1>
      <p>{{ repository.description }}</p>
    </div>

    <hr />

    <div class="issues-wrapper">
      <div class="issues-selectors">
        <button
          type="button"
          v-for="filter in filters"
          v-bind:key="filter.value"
          v-on:click="handleFilterChange(filter.value)"
          v-bind:disabled="filter.disabled"
        >{{ filter.content }}</button>
      </div>

      <div class="loading-spinner" v-if="loadingIssues">
        <fa-icon icon="spinner" class="fa-2x loading-spinner-linear" />
      </div>

      <ul class="issues-list" v-else>
        <li v-for="issue in issues" v-bind:key="issue.id">
          <img v-bind:src="issue.user.avatar_url" v-bind:alt="issue.user.name" />
          <div class="issue-info">
            <strong>
              <a v-bind:href="issue.html_url" target="_blank">{{ issue.title }}</a>
              <span v-for="label in issue.labels" v-bind:key="label.id">
                {{
                label.name
                }}
              </span>
            </strong>
            <p>{{ issue.user.login }}</p>
          </div>
        </li>
      </ul>

      <div class="page-buttons">
        <button
          type="button"
          v-on:click="handlePageChange(page - 1)"
          v-bind:disabled="page <= 1"
        >Previous</button>

        <span>Page {{page}}</span>

        <button type="button" v-on:click="handlePageChange(page + 1)">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

export default {
  data() {
    return {
      repository: {},
      loadingRepository: false,
      loadingIssues: false,
      filters: [
        { value: 'all', content: 'All', disabled: true },
        { value: 'open', content: 'Open', disabled: false },
        { value: 'closed', content: 'Closed', disabled: false },
      ],
      issues: [],
      page: 1,
    };
  },

  components: {
    LoadingSpinner,
  },

  methods: {
    handleFilterChange(filter) {
      this.page = 1;
      this.filters = this.filters.map(item => ({
        ...item,
        disabled: item.value === filter,
      }));
    },

    handlePageChange(value) {
      this.page = value;
    },

    async loadRepository() {
      this.loadingRepository = true;

      const { repository } = this.$route.params;

      const response = await api.get(`repos/${repository}`);

      this.repository = response.data;

      this.loadingRepository = false;
    },

    async loadIssues() {
      this.loadingIssues = true;

      const issuesFilter = this.filters.find(
        filter => filter.disabled === true
      );

      const { repository } = this.$route.params;

      const response = await api.get(`repos/${repository}/issues`, {
        params: {
          per_page: 5,
          page: this.page,
          state: issuesFilter.value,
        },
      });

      this.issues = response.data;
      this.loadingIssues = false;
    },
  },

  created() {
    this.loadRepository();
    this.loadIssues();
  },

  watch: {
    filters() {
      this.loadIssues();
    },

    page() {
      this.loadIssues();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
@import '~@/styles/animations/_loading.scss';

div.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  & > a {
    color: $color1;
    font-size: 16px;
  }

  .repository-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 100%;

    img {
      width: 120px;
      height: 120px;
      border: 4px;
      box-shadow: 2px 2px 2px #eaeaea;
    }

    h1 {
      font-size: 24px;
      margin-top: 15px;
      margin-bottom: 5px;
    }

    p {
      width: 80%;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  }

  hr {
    width: 100%;
    height: 1px;
    background-color: $color3;
    margin: 40px 0;
  }

  .issues-wrapper {
    width: 100%;

    .issues-selectors {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 70px;
      margin-bottom: 20px;

      button {
        width: 80px;
        padding: 10px;
        border-radius: 4px;
        color: $color1;
        background-color: #fff;
        border: 2px solid $color1;

        &:hover {
          color: #fff;
          background-color: $color1;
        }

        &:disabled {
          background-color: $color1;
          color: #fff !important;
        }
      }
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;

      margin: 100px;

      svg {
        color: $color1;
      }
    }

    ul.issues-list {
      li {
        border-radius: 4px;
        border: 1px solid $color3;
        padding: 15px;

        display: flex;
        align-items: center;

        img {
          width: 36px;
          height: 36px;
          border: 1px solid $color3;
          border-radius: 50%;
        }

        div.issue-info {
          flex: 1;
          margin-left: 15px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          strong {
            font-size: 16px;

            a {
              color: $color2;
            }

            span {
              font-size: 12px;
              background-color: $color3;
              padding: 3px;
              border-radius: 4px;
              margin-left: 5px;
            }
          }

          p {
            color: #666;
            font-size: 12px;
            margin-top: 5px;
          }
        }

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
    }

    .page-buttons {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        background-color: $color2;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        width: 70px;
      }
    }
  }
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
