export const useEnums = () => {
  const stacks = [
    { color: '#e34c26', name: 'Html', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/html-2752158-2284975.png?f=webp&w=256' },
    { color: '#f0db4f', name: 'Javascript', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2038874-1720087.png?f=webp&w=256' },
    { color: '#264de4', name: 'Css', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/css3-8-1175200.png?f=webp&w=256' },
    { color: '#41b883', name: 'Vuejs', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/vuejs-3-1175070.png?f=webp&w=256' },
    { color: '#3b8070', name: 'Nuxt', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/nuxt-dot-js-3628959-3030184.png?f=webp&w=256' },
    { color: '#94704e', name: 'Cypress', imgUrl: 'https://cdn.icon-icons.com/icons2/3911/PNG/512/cypress_logo_icon_247239.png' },
    { color: '#563d7c', name: 'Boostrap', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/bootstrap-2038880-1720093.png?f=webp&w=256' },
    { color: '#ddd6fe', name: 'Talwind', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/tailwind-css-5285308-4406745.png?f=webp&w=256' },
    { color: '#68a063', name: 'Nodejs', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/node-js-1-1174935.png?f=webp&w=256' },
    { color: '#FFFFFF', name: 'Express', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/express-9-1175170.png?f=webp&w=256' },
    { color: '#3E2C00', name: 'Git', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/git-18-1175219.png?f=webp&w=256' },
    { color: '#034f84', name: 'SQL', imgUrl: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/sql-file-2694551-2246328.png?f=webp&w=256' },
    { color: '#E8E7D5', name: 'Mongo DB', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png?f=webp&w=256' },
    { color: '#9b4993', name: 'C# (unity)', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/c-57-1175191.png?f=webp&w=256' },
    { color: '#00cccc', name: 'Unity', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/unity-2749374-2284764.png?f=webp&w=256' },
    { color: '#0040AD', name: 'Linux', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/linux-21-1174928.png?f=webp&w=256' },
    { color: '#61DBFB', name: 'React', imgUrl: 'https://cdn.iconscout.com/icon/free/png-256/react-226053.png?f=webp&w=256' },
    { color: '#20232A', name: 'React native', imgUrl: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/react-js-5379349-4492471.png?f=webp&w=256' },
  ]

  const profileIcons = [
    {
      name: 'Github',
      imgUrl: 'https://cdn-icons-png.flaticon.com/512/733/733553.png',
      url: 'https://github.com/lipecss',
      text: 'Meu Github'
    },
    {
      name: 'Xbox',
      imgUrl: 'https://cdn-icons-png.flaticon.com/512/732/732260.png',
      url: 'https://account.xbox.com/pt-br/Profile?xr=socialtwistnav&activetab=main:mainTab2',
      text: 'Meu perfil Xbox'
    },
    {
      name: 'Twitch',
      imgUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968819.png',
      url: 'https://www.twitch.tv/felipecss',
      text: 'Meu canal na Twitch'
    },
    {
      name: 'youtube music',
      imgUrl: 'https://cdn-icons-png.flaticon.com/512/1377/1377212.png',
      url: 'https://music.youtube.com/channel/UCgV-XyYiMhHUmZWws0XyCeg?feature=share',
      text: 'Lista do que escuto'
    },
    {
      name: 'CV',
      imgUrl: 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
      url: '',
      text: 'Baixe meu CV'
    }
  ]


  return { stacks, profileIcons }
}
