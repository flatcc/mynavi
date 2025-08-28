export interface NavItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'development',
    name: '开发工具',
    description: '编程开发相关工具和资源',
    icon: 'fas fa-code'
  },
  {
    id: 'design',
    name: '设计资源',
    description: 'UI/UX设计工具和素材',
    icon: 'fas fa-palette'
  },
  {
    id: 'productivity',
    name: '效率工具',
    description: '提升工作效率的应用',
    icon: 'fas fa-rocket'
  },
  {
    id: 'learning',
    name: '学习资源',
    description: '在线课程和学习平台',
    icon: 'fas fa-graduation-cap'
  },
  {
    id: 'news',
    name: '资讯媒体',
    description: '科技新闻和行业资讯',
    icon: 'fas fa-newspaper'
  },
  {
    id: 'entertainment',
    name: '娱乐休闲',
    description: '音乐、视频、游戏等',
    icon: 'fas fa-gamepad'
  }
];

export const navigationItems: NavItem[] = [
  // 开发工具
  {
    id: 'github',
    title: 'GitHub',
    description: '全球最大的代码托管平台，支持Git版本控制',
    url: 'https://github.com',
    icon: 'fab fa-github',
    category: 'development',
    tags: ['代码托管', '开源', 'Git']
  },
  {
    id: 'stackoverflow',
    title: 'Stack Overflow',
    description: '程序员问答社区，解决编程问题的权威平台',
    url: 'https://stackoverflow.com',
    icon: 'fas fa-question-circle',
    category: 'development',
    tags: ['问答', '编程', '社区']
  },
  {
    id: 'codepen',
    title: 'CodePen',
    description: '在线代码编辑器，快速原型设计和代码分享',
    url: 'https://codepen.io',
    icon: 'fas fa-code',
    category: 'development',
    tags: ['在线编辑器', '原型设计', '前端']
  },
  {
    id: 'jsfiddle',
    title: 'JSFiddle',
    description: 'JavaScript在线代码测试和分享平台',
    url: 'https://jsfiddle.net',
    icon: 'fab fa-js-square',
    category: 'development',
    tags: ['JavaScript', '测试', '分享']
  },

  // 设计资源
  {
    id: 'figma',
    title: 'Figma',
    description: '协作式界面设计工具，支持实时多人协作',
    url: 'https://figma.com',
    icon: 'fab fa-figma',
    category: 'design',
    tags: ['UI设计', '协作', '原型']
  },
  {
    id: 'dribbble',
    title: 'Dribbble',
    description: '设计师作品展示和灵感来源平台',
    url: 'https://dribbble.com',
    icon: 'fab fa-dribbble',
    category: 'design',
    tags: ['设计灵感', '作品展示', '创意']
  },
  {
    id: 'behance',
    title: 'Behance',
    description: 'Adobe旗下的创意作品展示平台',
    url: 'https://behance.net',
    icon: 'fab fa-behance',
    category: 'design',
    tags: ['创意作品', '设计', 'Adobe']
  },
  {
    id: 'unsplash',
    title: 'Unsplash',
    description: '高质量免费图片素材网站',
    url: 'https://unsplash.com',
    icon: 'fas fa-image',
    category: 'design',
    tags: ['图片素材', '免费', '高质量']
  },

  // 效率工具
  {
    id: 'notion',
    title: 'Notion',
    description: '全能型笔记和协作工具，支持多种内容格式',
    url: 'https://notion.so',
    icon: 'fas fa-sticky-note',
    category: 'productivity',
    tags: ['笔记', '协作', '知识管理']
  },
  {
    id: 'trello',
    title: 'Trello',
    description: '看板式项目管理工具，直观的任务管理',
    url: 'https://trello.com',
    icon: 'fas fa-tasks',
    category: 'productivity',
    tags: ['项目管理', '看板', '任务管理']
  },
  {
    id: 'slack',
    title: 'Slack',
    description: '团队沟通协作平台，支持多种集成',
    url: 'https://slack.com',
    icon: 'fab fa-slack',
    category: 'productivity',
    tags: ['团队沟通', '协作', '集成']
  },
  {
    id: 'zoom',
    title: 'Zoom',
    description: '视频会议和在线协作平台',
    url: 'https://zoom.us',
    icon: 'fas fa-video',
    category: 'productivity',
    tags: ['视频会议', '在线协作', '远程办公']
  },

  // 学习资源
  {
    id: 'coursera',
    title: 'Coursera',
    description: '全球顶尖大学在线课程平台',
    url: 'https://coursera.org',
    icon: 'fas fa-graduation-cap',
    category: 'learning',
    tags: ['在线课程', '大学课程', '学习平台']
  },
  {
    id: 'udemy',
    title: 'Udemy',
    description: '技能提升在线学习平台，课程种类丰富',
    url: 'https://udemy.com',
    icon: 'fas fa-chalkboard-teacher',
    category: 'learning',
    tags: ['技能学习', '在线课程', '实用技能']
  },
  {
    id: 'freecodecamp',
    title: 'freeCodeCamp',
    description: '免费编程学习平台，从零开始学习编程',
    url: 'https://freecodecamp.org',
    icon: 'fas fa-laptop-code',
    category: 'learning',
    tags: ['编程学习', '免费', '实践项目']
  },
  {
    id: 'mdn',
    title: 'MDN Web Docs',
    description: 'Mozilla开发者网络，Web开发权威文档',
    url: 'https://developer.mozilla.org',
    icon: 'fas fa-book',
    category: 'learning',
    tags: ['Web开发', '文档', 'Mozilla']
  },

  // 资讯媒体
  {
    id: 'techcrunch',
    title: 'TechCrunch',
    description: '科技新闻和创业资讯网站',
    url: 'https://techcrunch.com',
    icon: 'fas fa-newspaper',
    category: 'news',
    tags: ['科技新闻', '创业', '资讯']
  },
  {
    id: 'theverge',
    title: 'The Verge',
    description: '科技、科学、艺术和文化新闻网站',
    url: 'https://theverge.com',
    icon: 'fas fa-globe',
    category: 'news',
    tags: ['科技新闻', '文化', '艺术']
  },
  {
    id: 'wired',
    title: 'Wired',
    description: '深度科技报道和分析杂志',
    url: 'https://wired.com',
    icon: 'fas fa-microchip',
    category: 'news',
    tags: ['深度报道', '科技分析', '杂志']
  },
  {
    id: 'ars-technica',
    title: 'Ars Technica',
    description: '技术深度分析和评论网站',
    url: 'https://arstechnica.com',
    icon: 'fas fa-cogs',
    category: 'news',
    tags: ['技术分析', '深度评论', '科技']
  },

  // 娱乐休闲
  {
    id: 'spotify',
    title: 'Spotify',
    description: '全球领先的音乐流媒体服务平台',
    url: 'https://spotify.com',
    icon: 'fab fa-spotify',
    category: 'entertainment',
    tags: ['音乐', '流媒体', '播放器']
  },
  {
    id: 'netflix',
    title: 'Netflix',
    description: '全球知名视频流媒体服务平台',
    url: 'https://netflix.com',
    icon: 'fas fa-film',
    category: 'entertainment',
    tags: ['视频', '流媒体', '影视']
  },
  {
    id: 'steam',
    title: 'Steam',
    description: '全球最大的数字游戏发行平台',
    url: 'https://store.steampowered.com',
    icon: 'fab fa-steam',
    category: 'entertainment',
    tags: ['游戏', '数字发行', '平台']
  },
  {
    id: 'youtube',
    title: 'YouTube',
    description: '全球最大的视频分享和观看平台',
    url: 'https://youtube.com',
    icon: 'fab fa-youtube',
    category: 'entertainment',
    tags: ['视频', '分享', '观看']
  }
];
