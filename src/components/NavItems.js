import PersonIcon from '@mui/icons-material/Person';

export const menuItems = [
  {
    title: "Movies",
    submenu: [
      {
        title: "Popular",
        url: "movies/popular",
      },
      {
        title: "Upcoming",
        url: "movies/upcoming",
      },
      {
        title: "Now Playing",
        url: "movies/now-playing",
      },
      {
        title: "Top Rated",
        url: "movies/top-rated",
      },
    ],
  },
  {
    title: "TV Shows",

    submenu: [
      {
        title: "Popular",
        url: "tv-shows/popular",
      },
      {
        title: "Airing Today",
        url: "tv-shows/airing-today",
      },
      {
        title: "On TV",
        url: "tv-shows/on-tv",
      },
      {
        title: "Top Rated",
        url: "tv-shows/top-rated",
      },
    ],
  },
  {
    title: "Actors",
    url: "actors",
  },
];

export const profile = [
  {
    title: <PersonIcon />,
    submenu: [
      {
        title: `Profile`,
        url: "user-profile",
      },
  
    ],
  }
]
