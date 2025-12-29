export const path = {
  home: {
    getHref: () => '/',
  },

  public: {
    login: {
      getHref: () => '/login',
    },
    thread: {
      getHref: (id : string) => `/threads/${id}`,
    },
    post: {
      getHref: (id : string) => `/posts/${id}`
    },
    user: {
      getHref: (id : string) => `/users/${id}`
    },
    terms: {
      getHref: () => '/term-of-service'
    },
    about: {
      getHref: () => '/about-us'
    },
    feed: {
      getHref: () => '/feed'
    },
  },
  private: {
    settings: {
      getHref: () => '/settings'
    },
  },
  admin: {
    dashboard: {
      getHref: () => '/admin/dashboard'
    },
  }
}