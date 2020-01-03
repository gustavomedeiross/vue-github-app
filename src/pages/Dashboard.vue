<template>
  <div>
    <div class="title">
      <h2><fa-icon :icon="['fab', 'github']" /> Repositories</h2>
    </div>
    <form class="input-wrapper" v-on:submit.prevent="handleSubmit">
      <input type="text" v-model="newRepo" placeholder="Add Repository" />
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
          <strong> {{ repo.fullName }} </strong>
        </span>

        <router-link v-bind:to="`repository/${repo.encodedFullName}`"
          >Detail</router-link
        >
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
    };
  },

  methods: {
    async handleSubmit() {
      this.loading = true;
      const response = await api.get(`repos/${this.newRepo}`);
      const repository = this.parseRepository(response.data);
      this.repos.push(repository);
      this.loading = false;
      this.newRepo = '';
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

  input {
    border: 1px solid #eaeaea;
    border-radius: 4px;
    width: 100%;
    margin-right: 10px;
    padding: 10px;
    color: $color2;

    &:placeholder {
      color: #eaeaea;
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
