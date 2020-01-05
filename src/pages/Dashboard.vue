<template>
  <div>
    <div class="title">
      <h2>
        <fa-icon :icon="['fab', 'github']" />Repositories
      </h2>
    </div>
    <form class="input-wrapper" v-on:submit.prevent="handleSubmit">
      <div>
        <input
          type="text"
          v-model="newRepo"
          placeholder="Add Repository"
          v-bind:class="{ error: error.length > 0 }"
        />
        <span v-if="error.length > 0">{{error}}</span>
      </div>
      <button type="submit">
        <fa-icon icon="spinner" v-if="loading" class="loading-spinner-linear" />
        <fa-icon icon="plus" v-else />
      </button>
    </form>

    <ul class="repos-wrapper">
      <li v-for="repo in repos" v-bind:key="repo.id">
        <span>
          <button type="button" v-on:click="handleDelete(repo.id)">
            <fa-icon icon="trash" />
          </button>
          <strong>{{ repo.fullName }}</strong>
        </span>

        <router-link v-bind:to="`repository/${repo.encodedFullName}`">Detail</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      newRepo: '',
      repos: [],
      loading: false,
      error: '',
    };
  },

  methods: {
    async handleSubmit() {
      this.error = '';
      this.loading = true;

      try {
        const duplicatedRepo = this.repos.some(
          repo => repo.fullName === this.newRepo
        );

        if (duplicatedRepo) {
          throw new Error('You already have this repository');
        }

        api.interceptors.response.use(null, async err => {
          if (err.response.status === 404) {
            throw new Error('Repository not found');
          }

          return Promise.reject(err);
        });

        const response = await api.get(`repos/${this.newRepo}`);

        const repository = this.parseRepository(response.data);

        this.repos.push(repository);
        this.newRepo = '';
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    parseRepository(repo) {
      const { id, full_name: fullName } = repo;

      const encodedFullName = encodeURIComponent(fullName);

      return {
        id,
        fullName,
        encodedFullName,
      };
    },

    handleDelete(id) {
      this.repos = this.repos.filter(repo => repo.id !== id);
    },
  },

  created() {
    const rawRepos = localStorage.getItem('repos');

    if (rawRepos) {
      this.repos = JSON.parse(rawRepos);
    }
  },

  destroyed() {
    this.error = '';
  },

  watch: {
    repos() {
      const repos = JSON.stringify(this.repos);
      localStorage.setItem('repos', repos);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
@import '~@/styles/animations/_loading.scss';

div.title {
  display: flex;
}

form {
  display: flex;
  margin: 30px 0;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 10px;

    input {
      border: 1px solid #eaeaea;
      border-radius: 4px;
      width: 100%;
      padding: 10px;
      color: $color2;

      &.error {
        border-color: $color4;
      }

      &:placeholder {
        color: #eaeaea;
      }
    }

    span {
      color: $color4;
      margin-top: 5px;
      font-size: 12px;
    }
  }

  button {
    background-color: $color2;
    height: 40px;
    width: 48px;
    border-radius: 4px;
    svg {
      color: #fff;
    }
  }
}

ul.repos-wrapper {
  li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 15px;

    box-shadow: 1px 1px 1px #eaeaea;
    border-radius: 4px;

    &:not(:last-child) {
      /* border-bottom: 1px solid #eaeaea; */
      margin-bottom: 20px;
    }

    span {
      strong {
        font-weight: normal;
      }

      button {
        background-color: transparent;
        svg {
          color: $color4;
          margin-right: 10px;
        }
      }
    }

    a {
      color: $color1;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
