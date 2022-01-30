module.exports = {
  title: `YoungGyu Blog`, // Your blog title
  description: `Relax and Reflect`, // Your blog description
  author: `Lee YoungGyu`,
  siteUrl: `http://answer.netlify.app/`, // Your blog site url
  social: [
    //You can find and use icons on the https://fontawesome.com/icons?d=gallery&s=brands
    {
      icon: `github`,
      url: `https://github.com/lygggg`,
    },
    {
      icon: `google`,
      url: `https://baayoo93@gmail.com`,
    },
    {
      icon: `smile`,
      url: `https://lygggg.github.io/about`,
    },
  ],
  icon: `content/assets/icon.png`, // Your blog icon
  planTitle: `Future Action Plan`, // Your blog planTitle
  showPlan: true, //If you don't want to see the plan, change the status to false.
  comment: {
    disqusShortName: 'lyg', // Your disqus-short-name. check disqus.com.
    // You shoud modify disqus-short-name in "gatsby-config.js" too. check it.
  },
  ga: 'UA-149433358-1', // Add your google analytics tranking ID
}
