module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/styles/base/reset.scss";
            @import "@/styles/tools/functions.scss";
            @import "@/styles/base/variables.scss";
            @import "@/styles/tools/mixins.scss";
            @import "@/styles/base/typography.scss";
            @import "@/styles/base/main.scss";
            @import "@/styles/components/header.scss";
            @import "@/styles/components/footer.scss";
            @import "@/styles/components/armies-form.scss";
            @import "@/styles/components/current-game.scss";
        `,
      },
    },
  },
};
